// // import
// const <<moduleNickname>> = require('<<modulePath>>')
const Reward = require('../models/Reward');
const Star = require('../models/Star');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

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

function getSponsorDiv(){
    const sponsor_div = [];
    const sponsor_config = Reward.getSponsorsList();
    for (let i in sponsor_config){
        sponsor_div.push({
            image: sponsor_config[i].image,
            name: sponsor_config[i].name,
        });
    }
    return sponsor_div;
}

async function getUserStars(user_id, ){
    const star_inv = await Star.getStarInventoryByUserId(user_id);
    const star_inv_list = [];
    for (let i in star_inv){
        let style = "";
        if (star_inv[i] > 0) style = "flex flex-col w-full p-5 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:drop-shadow-lg hover:bg-secondary hover:bg-opacity-30";
        else style = "flex flex-col w-full p-5 text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:drop-shadow-lg  hover:bg-gray-200";
        star_inv_list.push({
            code_name: Star.star_config[i].code_name,
            display: Star.star_config[i].display,
            amount: star_inv[i],
            style: style,
            force_checked: false
        });
    }
    return star_inv_list;
}

async function getTradeAbleRewardList(star_amount){
    const reward_trede_policy = Reward.getStarsUseToTradeCoupon();
    const reward_left = await Reward.getRewardLeft();
    const reward_config = Reward.getRewardConfig();
    const trade_able_reward_list = [];
    for (let i in reward_trede_policy){
        if (reward_trede_policy[i] === star_amount){
            trade_able_reward_list.push({
                code_name: i,
                reward: reward_config[i].display.name + " " + reward_config[i].display.from,
                image: reward_config[i].display.image,
                stock_left: reward_left[i]
            });
        }
    }
    return trade_able_reward_list;
}

async function getUsersCoupons(user_id){
    const user_coupons = await Coupon.getCouponsByUserId(user_id);
    const user = await User.getUser(user_id);
    const user_coupons_list = [];
    for (let i in user_coupons){
        let reward = Reward.getRewardConfig()[user_coupons[i].reward].display;
        let is_redeemed = false;
        user_coupons_list.push({
            coupon_uuid: user_coupons[i].coupon_uuid,
            user: user,
            reward: reward,
            qr_code: user_coupons[i].qr_code,
            is_redeemed: is_redeemed,
        });
    }
    return user_coupons_list;
}

// // define route handler (with export)
// export.<<controllerSubName>> = (req, res) => {
// <<controllerLogic, render>>
// }
exports.reward = async (req, res) => {

    const reward_div_list = getRewardDiv();
    const sponsor_div_list = getSponsorDiv();

    res.render('user/reward', { reward_div_list, sponsor_div_list })
}

exports.trade_coupon = async (req, res) => {

    let access_token = req.query.access_token;
    console.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);

    const star_div_list = await getUserStars(user.user_id);
    const star_check_box_list = [];
    for (let i in star_div_list){
        star_check_box_list.push(star_div_list[i].code_name);
    }

    const trade_able_reward_list = [];
    const reward_check_box_list = [];

    const mode = "select_star";

    res.render('user/trade_coupon', { mode, star_div_list, star_check_box_list, trade_able_reward_list, reward_check_box_list, selected_star: [] })
}

exports.trade_coupon_submit_select_star = async (req, res) => {

    const submittedForm = req.body;

    console.log("Here", submittedForm);
    console.log("Here2", Object.keys(submittedForm));

    let access_token = req.query.access_token;
    console.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);

    let star_selected = 0;
    const star_div_list = await getUserStars(user.user_id);
    for (let i in star_div_list){
        if (Object.keys(submittedForm).includes(star_div_list[i].code_name)){
            star_div_list[i].force_checked = true;
            star_selected += 1;
            console.log(star_div_list[i]);
        }
    }

    const star_check_box_list = [];
    for (let i in star_div_list){
        star_check_box_list.push(star_div_list[i].code_name);
    }

    const trade_able_reward_list = await getTradeAbleRewardList(star_selected);
    const reward_check_box_list = [];
    for (let i in trade_able_reward_list){
        reward_check_box_list.push(trade_able_reward_list[i].code_name);
    }

    const mode = "select_reward";

    res.render('user/trade_coupon', { mode, star_div_list, star_check_box_list, trade_able_reward_list, reward_check_box_list, selected_star: Object.keys(submittedForm) });
}

exports.trade_coupon_submit_select_reward = async (req, res) => {

    const submittedForm = req.body;

    console.log("Here", submittedForm);

    const star_selected = submittedForm["passingSelectedStar"].split(",");
    star_selected.pop();
    console.log("Here3", star_selected);

    const reward_selected = Object.keys(submittedForm)[0];

    let access_token = req.query.access_token;
    console.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);

    const newCoupon = await Coupon.couponUp({
        user_id: user.user_id,
        reward: reward_selected,
        stars: star_selected
    });

    // const newCoupon = await Coupon.createCoupon({
    //     user_id: user.user_id,
    //     reward: reward_selected
    // });

    const user_coupons_list = await getUsersCoupons(user.user_id);
    const first_popup = newCoupon.coupon_uuid;

    res.render('user/my_coupon', { first_popup, user_coupons_list });
}

exports.my_coupon = async (req, res) => {

    let access_token = req.query.access_token;
    console.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);

    const user_coupons_list = await getUsersCoupons(user.user_id);
    const first_popup = "";

    res.render('user/my_coupon', { first_popup, user_coupons_list });
}

exports.login = async (req, res) => {
    res.render('user/login');
}

exports.login_submit = async (req, res) => {

}