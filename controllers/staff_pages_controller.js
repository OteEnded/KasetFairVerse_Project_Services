// // import
// const <<moduleNickname>> = require('<<modulePath>>')
const Coupon = require('../models/coupon');
const User = require('../models/user');
const Reward = require('../models/reward');

// // define view function
// function <<functionName>>(<<functionParam>>) {
// <<functionBody, return>>
// }



// // define route handler (with export)
// export.<<controllerSubName>> = (req, res) => {
// <<controllerLogic, render>>
// }
exports.claim_reward = async (req, res) => {
    let staff = {
        name: "Ote"
    }
    res.render('staff/claim_reward', { staff })
}

exports.coupon_validation = async (req, res) => {

    const qr_result = req.query.qr_result;

    let error = null;
    const coupon = await Coupon.getCouponByCouponUuid(qr_result);
    let user = null;
    let reward = null;
    let extra_reward = null;

    if (coupon === null) {
        error = "Cannot find matching qr result -> " + qr_result;
    }
    else {
        const is_coupon_available = await Coupon.isCouponAvailable(coupon.coupon_uuid);
        if (!is_coupon_available) {
            error = "Coupon is not available, might be because it is already used";
        }
        user = await User.getUser(coupon.user_id);
        reward = Reward.getRewardConfig()[coupon.reward];
    }

    res.render('staff/coupon_validation', { error, user, reward, coupon, extra_reward })
}

exports.coupon_redeemed = async (req, res) => {

    const redeem_coupon = req.body.coupon_uuid;
    const redeem_staff = req.body.staff;

    console.log(redeem_coupon);
    console.log(redeem_staff);

    res.redirect('/claim_coupon')
}