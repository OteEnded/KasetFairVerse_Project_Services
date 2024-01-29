const putil = require('../utilities/projectutility');

function getRewardConfig() {
    return putil.getConfig()["reward"]
}

function getRewardList() {
    let reward_list = [];
    for (let i in getRewardConfig()) {
        reward_list.push(i);
    }
    return reward_list;
}

function getRewardStocks() {
    let reward_stocks = {};
    for (let i in getRewardConfig()) {
        reward_stocks[i] = getRewardConfig()[i]["stock"];
    }
    return reward_stocks;
}

function getStarsUseToTradeCoupon() {
    let reward_stars_use = {};
    for (let i in getRewardConfig()) {
        reward_stars_use[i] = getRewardConfig()[i]["stars_use"];
    }
    return reward_stars_use;
}

module.exports = {
    getRewardConfig,
    getRewardList,
    getRewardStocks,
    getStarsUseToTradeCoupon
}