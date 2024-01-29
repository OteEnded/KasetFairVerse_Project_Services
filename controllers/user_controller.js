// // import
// const <<moduleNickname>> = require('<<modulePath>>')
const Reward = require('../models/Reward')

// // define view function
// function <<functionName>>(<<functionParam>>) {
// <<functionBody, return>>
// }

const reward_list = {
    ku_milk: ["นมเกษตร","จาก KU milk"],
    ku_ice_cream: ["ไอศครีม","จาก KU premium"],
    est_cola: ["เครื่องดื่ม","จาก Est"],
    oishi: ["เครื่องดื่ม","จาก Oishi"],
    dog_food_nk: ["อาหารสัตว์","จาก N&K"],
    dog_food_oliver: ["อาหารสัตว์","จาก Oliver"],
    cat_food_paihangout: ["อาหารสัตว์","จาก Pai Hangout"],
    pz_cussons_set: ["ของชำร่วย","จาก Pz Cussons"],
    seven_11: ["ของชำร่วย","จาก 7-11"],
    kfc: ["บัตรกำนัล","จาก KFC"],
};

function getRewardDiv(){
    const reward_div = [];
    const reward_star_use = Reward.getStarsUseToTradeCoupon();
    for (let i in reward_list) {
        reward_div.push({
            reward: reward_list[i],
            stars_use: reward_star_use[i]
            }
        );
    }
    return reward_div;
}


// // define route handler (with export)
// export.<<controllerSubName>> = (req, res) => {
// <<controllerLogic, render>>
// }
exports.claim_coupon = (req, res) => {

    res.render('claim_coupon', {});
}

exports.reward = (req, res) => {

    const reward_div_list = getRewardDiv();

    res.render('user/reward', { reward_div_list })
}