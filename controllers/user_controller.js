// // import
// const <<moduleNickname>> = require('<<modulePath>>')
const Reward = require('../models/Reward')

// // define view function
// function <<functionName>>(<<functionParam>>) {
// <<functionBody, return>>
// }

const reward_dict = {
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

const image_dict = {
    ku_milk: "ku_milk",
    ku_ice_cream: "ku_ice_cream",
    est_cola: "est_cola",
    oishi: "oishi",
    dog_food_nk: "nk",
    dog_food_oliver: "oliver",
    cat_food_paihangout: "paihangout",
    pz_cussons_set: "pz_cussons",
    seven_11: "seven_11",
    kfc: "kfc",
};

function getRewardDiv(){
    const reward_div = [];
    const reward_star_use = Reward.getStarsUseToTradeCoupon();
    for (let i in reward_dict) {
        reward_div.push({
                reward: reward_dict[i],
                stars_use: reward_star_use[i],
                image: "/images/sponsers/" + image_dict[i] + ".png"
            }
        );
    }
    return reward_div;
}


// // define route handler (with export)
// export.<<controllerSubName>> = (req, res) => {
// <<controllerLogic, render>>
// }

exports.reward = (req, res) => {

    const reward_div_list = getRewardDiv();

    res.render('user/reward', { reward_div_list })
}

exports.trade_coupon = (req, res) => {
    res.render('user/trade_coupon')
}

exports.trade_coupon_find_matching_reward = (req, res) => {

    const submittedForm = req.body;

    console.log("Here", submittedForm);
    console.log("Here2", Object.keys(submittedForm));

    res.render('user/trade_coupon');
}

exports.my_coupon = (req, res) => {
    res.render('user/my_coupon')
}