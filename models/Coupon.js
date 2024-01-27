const user = require('../models/User');
const Stars = require('../entities/Stars');
const Coupons = require('../entities/Coupons');
const apirequester = require('../services/apirequester');

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
        const sum_of_coupons = await Coupons.sum('coupon', {
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

// Function to create a coupon
async function createCoupon(user_id) {
    try {
        const coupon = await Coupons.create({
            user_id: user_id
        });
        return coupon;
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
    createCoupon
}
