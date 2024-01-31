const putil = require('../utilities/projectutility');

const reward_config = {
    EstCola_Oishi_drinks: {
        stars_use: 1,
        stock: 100,
        display: {
            name: "เครื่องดื่ม",
            from: "จาก Est Cola และ Oishi",
            image: "/images/rewards/est_cola_and_oishi.png"
        }
    },
    DoiKham_gift_set: {
        stars_use: 2,
        stock: 180,
        display: {
            name: "ของที่ระลึก",
            from: "จาก Doi Kham",
            image: "/images/sponsors/doikham.png"
        }
    },
    SevenEleven_mug: {
        stars_use: 3,
        stock: 10,
        display: {
            name: "แก้วที่ระลึก",
            from: "จาก 7-11",
            image: "/images/sponsors/seven_eleven.png"
        }
    },
    SevenEleven_folder: {
        stars_use: 3,
        stock: 40,
        display: {
            name: "แฟ้มที่ระลึก",
            from: "จาก 7-11",
            image: "/images/sponsors/seven_eleven.png"
        }
    },
    InfinitM_keychain_2: {
        stars_use: 3,
        stock: 56,
        display: {
            name: "พวงกุญแจ ตุ๊กตาหมี",
            from: "จาก Infinit M",
            image: "/images/sponsors/infinite_m.png"
        }
    },
    KFC_gift_voucher: {
        stars_use: 4,
        stock: 100,
        display: {
            name: "บัตรกำนัล",
            from: "จาก KFC",
            image: "/images/sponsors/kfc.png"
        }
    },
    InfinitM_random_plushy: {
        stars_use: 5,
        stock: 91,
        display: {
            name: "ตุ๊กตาคละแบบ",
            from: "จาก Infinit M",
            image: "/images/sponsors/infinite_m.png"
        }
    },
    NK_dog_food: {
        stars_use: 6,
        stock: 12,
        display: {
            name: "อาหารสุนัข",
            from: "จาก N&K",
            image: "/images/sponsors/nk.png"
        }
    },
    NK_cat_food: {
        stars_use: 6,
        stock: 12,
        display: {
            name: "อาหารแมว",
            from: "จาก N&K",
            image: "/images/sponsors/nk.png"
        }
    },
    Oliver_dog_food: {
        stars_use: 6,
        stock: 16,
        display: {
            name: "อาหารสุนัข",
            from: "จาก Oliver",
            image: "/images/sponsors/oliver.png"
        }
    },
    Oliver_cat_food: {
        stars_use: 6,
        stock: 32,
        display: {
            name: "อาหารแมว",
            from: "จาก Oliver",
            image: "/images/sponsors/oliver.png"
        }
    },
    PaiHangOut_cat_food: {
        stars_use: 6,
        stock: 12,
        display: {
            name: "อาหารแมว",
            from: "จาก Pai Hangout",
            image: "/images/sponsors/paihangout.png"
        }
    },
    PZCussons_gift_set: {
        stars_use: 7,
        stock: 144,
        display: {
            name: "ของที่ระลึก",
            from: "จาก PZ Cussons",
            image: "/images/sponsors/pz_cussons.png"
        }
    },
    Major_ticket_2: {
        stars_use: -7,
        stock: 100,
        display: {
            name: "ตั๋วหนัง 2 ใบ",
            from: "จาก Major",
            image: "/images/sponsors/major.png"
        }
    }
};

const sponsors = {
    ThePremiumAtKu: {
        name: "The Premium @ KU",
        image: "/images/sponsors/the_premium_at_ku.png"
    },
    KuMilk: {
        name: "KU Milk",
        image: "/images/sponsors/ku_milk.png"
    },
    EstCola: {
        name: "Est Cola",
        image: "/images/sponsors/est_cola.png"
    },
    Oishi: {
        name: "Oishi",
        image: "/images/sponsors/oishi.png"
    },
    DoiKham: {
        name: "Doi Kham",
        image: "/images/sponsors/doikham.png"
    },
    SevenEleven: {
        name: "7-11",
        image: "/images/sponsors/seven_eleven.png"
    },
    InfinitM: {
        name: "Infinit M",
        image: "/images/sponsors/infinite_m.png"
    },
    KFC: {
        name: "KFC",
        image: "/images/sponsors/kfc.png"
    },
    NK: {
        name: "N&K",
        image: "/images/sponsors/nk.png"
    },
    Oliver: {
        name: "Oliver",
        image: "/images/sponsors/oliver.png"
    },
    PaiHangOut: {
        name: "Pai Hangout",
        image: "/images/sponsors/paihangout.png"
    },
    PZCussons: {
        name: "PZ Cussons",
        image: "/images/sponsors/pz_cussons.png"
    },
    Major: {
        name: "Major",
        image: "/images/sponsors/major.png"
    }
};


function getRewardConfig() {
    return reward_config;
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