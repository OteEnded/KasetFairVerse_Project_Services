const Coupons = require('../entities/Coupons');

const Reward = require('../models/Reward');
const User = require('../models/User');
const Star = require('../models/Star');

// Function to get all coupons
async function getAllCoupons() {
    try {
        const all_coupons = await Coupons.findAll();
        const coupon_list = [];
        for (let i in all_coupons) {
            coupon_list.push(all_coupons[i].dataValues);
        }
        return coupon_list;
    } catch (error) {
        throw error;
    }
}

// Function to get coupons by user_id
async function getCouponsByUserId(user_id) {
    try {
        const coupons = await Coupons.findAll({
            where: {
                user_id: user_id
            }
        });
        return coupons;
    }
    catch (error) {
        throw error;
    }
}

// Function to get the coupon by coupon_uuid
async function getCouponByCouponUuid(coupon_uuid) {
    try {
        const coupon = await Coupons.findOne({
            where: {
                coupon_uuid: coupon_uuid
            }
        });
        return coupon;
    }
    catch (error) {
        throw error;
    }
}

// Function to get sum of coupons by user_id
async function getSumOfCouponsByUserId(user_id) {
    try {
        const sum_of_coupons = await Coupons.count({
            where: {
                user_id: user_id
            }
        });
        return sum_of_coupons;
    }
    catch (error) {
        throw error;
    }
}

// Function to get coupons by reward
async function getCouponsByReward(reward) {
    try {
        const coupons = await Coupons.findAll({
            where: {
                reward: reward
            }
        });
        return coupons;
    }
    catch (error) {
        throw error;
    }
}

// Function to check for create coupon request
// req = {
//     user_id: 0,
//     reward: "",
//     stars: ["", ""]
// }
async function createCouponRequest(req) {
    try {

        // Check if request is valid
        if(req.user_id == null || req.reward == null || req.stars == null || req.stars.length === 0) {
            return {
                is_success: false,
                message: "Invalid request",
                content: null
            }
        }

        // Check if the user exists
        const user = await User.getUser(req.user_id);
        if (!user) {
            return {
                is_success: false,
                message: "User not found with the given user_id -> " + req.user_id,
                content: null
            }
        }

        // Check if the reward exists
        if (!Reward.getRewardList().includes(req.reward)) {
            return {
                is_success: false,
                message: "Reward not found with the given reward -> " + req.reward + " from the list of rewards -> " + Reward.getRewardList(),
                content: null
            }
        }

        // Check if the reward is still in stock
        const reward_stocks = Reward.getRewardStocks();
        const coupon_that_claim_this_reward = await Coupons.sum('coupon', {
            where: {
                reward: req.reward
            }
        });
        if (coupon_that_claim_this_reward >= reward_stocks[req.reward]) {
            return {
                is_success: false,
                message: "Reward is out of stock",
                content: null
            }
        }

        // Check if the user really has the stars
        const star_inv = await Star.getStarInventoryByUserId(req.user_id);
        for (let i in req.stars) {
            if (!Object.keys(star_inv).includes(req.stars[i])) {
                return {
                    is_success: false,
                    message: "The star requested to use is not in user's inventory (req.stars -> "
                        + req.stars + " AND star_inv ->" + star_inv + ")",
                    content: null
                }
            }
            if (star_inv[req.stars[i]] === 0) {
                return {
                    is_success: false,
                    message: "The star requested to use is not in user's inventory (req.stars -> "
                        + req.stars + " AND star_inv ->" + star_inv + ")",
                    content: null
                }
            }
        }

        // Check if the stars are enough to claim the reward
        const stars_use = Reward.getStarsUseToTradeCoupon();
        if (!req.stars.length === stars_use[req.reward]) {
            return {
                is_success: false,
                message: "Not enough stars to claim the reward",
                content: null
            }
        }

        // List out the stars to use
        let stars_to_use = [];
        for (let i in req.stars) {
            let star = await Star.findStarToUse(req.user_id, req.stars[i]);
            if (star == null) {
                return {
                    is_success: false,
                    message: "Star not found with the given star_id -> " + req.stars[i],
                    content: null
                }
            }
            stars_to_use.push(star.star_id);
        }

        // Create a coupon
        const createCouponReq = {
            user_id: req.user_id,
            reward: req.reward,
            stars_to_use: stars_to_use
        }

        const coupon = await createCoupon(createCouponReq);
        if (!coupon) {
            return {
                is_success: false,
                message: "Failed to create a coupon",
                content: null
            }
        }
        return coupon;

    }
    catch (error) {
        throw error;
    }
}

// Function to create a coupon
async function couponUp(req) {
    try {
        return await createCouponRequest(req);
    }
    catch (error) {
        throw error;
    }
}

// Function to create a coupon
async function createCoupon(req) {
    try {
        const Reward = require('../models/Reward');

        // Check reward is valid
        if (!Reward.getRewardList().includes(req.reward)) {
            return {
                is_success: false,
                message: "Reward not found with the given reward -> " + req.reward + " from the list of rewards -> " + Reward.getRewardList(),
                content: null
            }
        }

        const coupon = await Coupons.create({
            user_id: req.user_id,
            reward: req.reward,
        });
        for (let i in req.stars_to_use) {
            await Star.useStar(req.stars_to_use[i], coupon.coupon_uuid);
        }
        return coupon;
    }
    catch (error) {
        throw error;
    }
}

// Function to create major coupons
async function majorCouponUp(user_id) {
    try {
        const number_of_different_star_of_user = await Star.getNumberOfDifferentStarSourcesByUserId(user_id, true);
        if (number_of_different_star_of_user < 7) {
            return {
                is_success: false,
                message: "Not enough different stars to claim the major coupon",
                content: null
            }
        }

        const is_user_has_major_coupon = await getCouponsByReward("major");
        if (is_user_has_major_coupon.length > 0) {
            return {
                is_success: false,
                message: "User already has a major coupon",
                content: null
            }
        }

        const major_coupon = await createCoupon({
            user_id: user_id,
            reward: "major",
            stars_to_use: []
        });

    }
    catch (error) {
        throw error;
    }
}

// Function to get sum of coupons by reward
async function getSumOfCouponsByReward(reward) {
    try {
        const sum_of_coupons = await Coupons.sum('coupon', {
            where: {
                reward: reward
            }
        });
        return sum_of_coupons;
    }
    catch (error) {
        throw error;
    }
}


module.exports = {
    getAllCoupons,
    getCouponsByUserId,
    getCouponByCouponUuid,
    getSumOfCouponsByUserId,
    createCouponRequest,
    couponUp,
    createCoupon, // For TESTING ONLY! Remove this line in production
    majorCouponUp,
    getSumOfCouponsByReward,
    getCouponsByReward

}
