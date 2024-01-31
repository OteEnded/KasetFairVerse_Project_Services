// // import
// const <<moduleNickname>> = require('<<modulePath>>')
const Reward = require('../models/Reward')

// // define view function
// function <<functionName>>(<<functionParam>>) {
// <<functionBody, return>>
// }

function getRewardDiv(){
    const reward_div = [];
    const reward_config = Reward.getRewardConfig();
    for (let i in reward_config) {
        console.log(reward_config.i)
        let stars_use_msg = "";
        if (reward_config[i].stars_use > 0) {
            stars_use_msg = "ใช้ดาว " + reward_config[i].stars_use + " ดวง";
        } else {
            stars_use_msg = "ได้รับทันทีเมื่อเก็บดาวครบ " + (-reward_config[i].stars_use) + "ดวง";
        }
        reward_div.push({
            image: reward_config[i].display.image,
            reward: [reward_config[i].display.name, reward_config[i].display.from],
            stars_use: stars_use_msg,
        });
    }
    return reward_div;
}

// function getSponsorDiv(){
//     const sponsor_div = [];
//     const sponsor_config = Reward.
//     return sponsor_div;
// }

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