// // import
// const <<moduleNickname>> = require('<<modulePath>>')
const crypto = require('crypto');

const Reward = require('../models/Reward');
const Star = require('../models/Star');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

const putil = require('../utilities/projectutility')

// // define view function
// function <<functionName>>(<<functionParam>>) {
// <<functionBody, return>>
// }
function generateNonce() {
    return crypto.randomBytes(16).toString('base64');
}

async function getRewardDiv(){
    const reward_div = [];
    const reward_config = Reward.getRewardConfig();
    const reward_left = await Reward.getRewardLeft();
    console.log("Here", reward_left);
    for (let i in reward_config) {
        let stars_use_msg = "";
        if (reward_config[i].stars_use > 0) {
            stars_use_msg = "ใช้ดาว " + reward_config[i].stars_use + " ดวง*";
        } else {
            stars_use_msg = "ได้รับทันทีเมื่อเก็บดาวครบ " + (-reward_config[i].stars_use) + " ดวง*";
        }
        reward_div.push({
            image: reward_config[i].display.image,
            reward: [reward_config[i].display.name, reward_config[i].display.from],
            stars_use: stars_use_msg,
            reward_left: reward_left[i]
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
    const user_coupons = await Coupon.getAllAvailableCouponByUserId(user_id);
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

const game_list = [
    {
        name: "BigBangTheory",
        description: "เข้าสำรวจโลก Metaverse ของเรา",
        icon: "/images/games/BigBangTheory.png",
        url: "https://play.w4kc8xiyb4.bigbangtheory.io/"
    },
    {
        name: "ColorMatching",
        description: "เกมจับคู่สีเสื้อให้ตรงกับสีกระเป๋า",
        icon: "/images/games/Accessories_ColorMatching.png",
        url: "https://test-ae1f2.web.app/"
    },
    {
        name: "FindMyMeow",
        description: "เกมหาแมวในห้องนั่งเล่นให้ได้จำนวนมาก",
        icon: "/images/games/CoffeeBean_FindMyMeow.png",
        url: "https://coffee-game-meow.web.app/"
    },
    {
        name: "RaisuwanCrush",
        description: "เกมเรียงผลไม้ให้ได้ 3 ชิ้นขึ้นไปเพื่อเก็บคะแนน",
        icon: "/images/games/CornMilk_RaisuwanCrush.png",
        url: "https://rswtest1-fbc20.web.app/"
    },
    {
        name: "HoldYourBasket",
        description: "ถือตระกร้ารับของที่ตกลงมาให้ได้มากที่สุด",
        icon: "/images/games/Cosmetic_HoldYourBasket.png",
        url: "https://hold-your-basket.web.app/"
    },
    {
        name: "TheDrink",
        description: "ผสมเครื่องดื่มและชากันชงให้ได้หลากหลายสูตร",
        icon: "/images/games/Hemp_TheDrink.png",
        url: "https://the-drink.web.app/"
    },
    {
        name: "CWheat",
        description: "ดูแลข้าวให้เติบโตและเก็บเกี่ยวให้ได้มากที่สุด",
        icon: "/images/games/KubKaoKabGang_CWheat.png",
        url: "https://c-wheat.web.app/"
    },
    {
        name: "PasteScrumble",
        description: "เลือกวัตถุดิบสำหรับเครื่องแกงต่างๆ ให้ถูกต้อง",
        icon: "/images/games/KubKaoKabGang_PasteScrumble.png",
        url: "https://paste-scrumble.web.app/"
    }
]

async function getStarLeaderBoard(){
    const leader_board = await Star.getLeaderBoard();
    console.log(leader_board)
    return leader_board;
}


// // define route handler (with export)
// export.<<controllerSubName>> = (req, res) => {
// <<controllerLogic, render>>
// }
exports.reward = async (req, res) => {

    const reward_div_list = await getRewardDiv();
    const sponsor_div_list = getSponsorDiv();
    let logged_in;

    let access_token = req.query.access_token;
    putil.log("access_token", access_token)


    const user = await User.getUserFromBBTToken(access_token);
    putil.log("user", user)
    logged_in = !(user.user_id === 2);

    const game_button_list = [];
    for (let i in game_list){
        game_button_list.push(game_list[i].name);
    }

    const star_leaderboard = await getStarLeaderBoard();

    const nonce = generateNonce();
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.render('user/reward',
        {
            reward_div_list,
            sponsor_div_list,
            logged_in,
            username: user.username,
            game_div_list: game_list,
            nonce,
            game_button_list,
            star_leaderboard
        }
    );
}

exports.trade_coupon = async (req, res) => {

    let access_token = req.query.access_token;
    putil.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);
    if (user.user_id === 2){
        res.redirect('/login');
        return;
    }

    const star_div_list = await getUserStars(user.user_id);
    const star_check_box_list = [];
    for (let i in star_div_list){
        star_check_box_list.push(star_div_list[i].code_name);
    }

    const trade_able_reward_list = [];
    const reward_check_box_list = [];

    const mode = "select_star";

    const reward_div_list = await getRewardDiv();

    const nonce = generateNonce();
    try{
        res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
        res.render('user/trade_coupon',
            {
                mode,
                star_div_list,
                star_check_box_list,
                trade_able_reward_list,
                reward_check_box_list, selected_star: [],
                reward_div_list,
                nonce
            }
        );
    }
    catch (error) {
        putil.error(error);
    }
}

exports.trade_coupon_submit_select_star = async (req, res) => {

    const submittedForm = req.body;

    putil.log("Here", submittedForm);
    putil.log("Here2", Object.keys(submittedForm));

    let access_token = req.query.access_token;
    putil.log("access_token", access_token)
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
            putil.log(star_div_list[i]);
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

    const reward_div_list = await getRewardDiv();

    const nonce = generateNonce();
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.render('user/trade_coupon',
        {
            mode,
            star_div_list,
            star_check_box_list,
            trade_able_reward_list,
            reward_check_box_list,
            selected_star: Object.keys(submittedForm),
            reward_div_list,
            nonce
        }
    );
}

exports.trade_coupon_submit_select_reward = async (req, res) => {

    const submittedForm = req.body;

    putil.log("Here", submittedForm);

    const star_selected = submittedForm["passingSelectedStar"].split(",");
    star_selected.pop();
    putil.log("Here3", star_selected);

    const reward_selected = Object.keys(submittedForm)[0];

    let access_token = req.query.access_token;
    putil.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);

    const newCoupon = await Coupon.couponUp({
        user_id: user.user_id,
        reward: reward_selected,
        stars: star_selected
    });
    putil.log("NEW COUPON ->", newCoupon);

    // const newCoupon = await Coupon.createCoupon({
    //     user_id: user.user_id,
    //     reward: reward_selected
    // });

    const user_coupons_list = await getUsersCoupons(user.user_id);
    const first_popup = newCoupon.coupon_uuid;

    const nonce = generateNonce();
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.render('user/my_coupon',
        {
            first_popup,
            user_coupons_list,
            nonce
        }
    );
}

exports.my_coupon = async (req, res) => {

    let access_token = req.query.access_token;
    putil.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);
    putil.log("user", user);
    if (user.user_id === 2){
        res.redirect('/login');
        return;
    }

    const user_coupons_list = await getUsersCoupons(user.user_id);
    const first_popup = "";

    const nonce = generateNonce();
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.render('user/my_coupon', { first_popup, user_coupons_list, nonce });
}

exports.login = async (req, res) => {
    const nonce = generateNonce();
    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.render('user/login',
        {
            nonce
        }
    );
}

exports.login_submit = async (req, res) => {

    const username = req.body.userword;
    const password = req.body.passname;

    putil.log("user_page_controller[login_submit]: there is a login req with username -> " + username + " and password -> " + password);

    let access_token = await User.userLogin(username, password);
    if (username === 1) access_token = "1";

    if (access_token == null){
        res.redirect('/login');
        return;
    }

    res.redirect('/reward?access_token=' + access_token);
}

exports.game_middleware = async (req, res) => {

    let access_token = req.query.access_token;
    access_token = access_token.split("?")[0];
    putil.log("access_token", access_token)
    putil.log("game_id", req.query.game_id)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);
    putil.log("user", user);
    if (user.user_id === 2){
        res.redirect('/login');
        return;
    }

    let game_url = null;
    for (let i in game_list){
        if (game_list[i].name === req.query.game_id){
            game_url = i;
            break;
        }
    }
    if (game_url === null){
        res.redirect('/reward?access_token=' + access_token);
        return;
    }

    res.redirect(game_url + "?access_token=" + access_token);
}

exports.my_star = async (req, res) => {

    let access_token = req.query.access_token;
    putil.log("access_token", access_token)
    if (access_token === undefined || access_token === null){
        access_token = "1";
    }
    const user = await User.getUserFromBBTToken(access_token);
    putil.log("user", user);
    if (user.user_id === 2){
        res.redirect('/login');
        return;
    }

    const star_div_list = await getUserStars(user.user_id);
    const nonce = generateNonce();

    const total_star = await Star.getTotalStarByUserId(user.user_id);

    res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
    res.render('user/my_star',
        {
            star_div_list,
            total_star,
            nonce
        }
    );
}