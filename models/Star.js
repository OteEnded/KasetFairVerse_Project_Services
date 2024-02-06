const Stars = require('../entities/Stars');
const Point_Send_Logs = require('../entities/Point_Send_Logs');

const User = require('../models/User');
const Coupon = require('../models/Coupon');

const apirequester = require('../services/apirequester');

const star_config = {
    Accessories_ColorMatching: {
        code_name: "Accessories_ColorMatching",
        point_slug: "accessories",
        display: {
            name: "ColorMatching",
            image: "/images/stars/Accessories_ColorMatching.png"
        },
    },
    CoffeeBean_FindMyMeow: {
        code_name: "CoffeeBean_FindMyMeow",
        point_slug: "coffee_bean",
        display: {
            name: "FindMyMeow",
            image: "/images/stars/CoffeeBean_FindMyMeow.png"
        },
    },
    CornMilk_RaisuwanCrush: {
        code_name: "CornMilk_RaisuwanCrush",
        point_slug: "raisuwan",
        display: {
            name: "RaisuwanCrush",
            image: "/images/stars/CornMilk_RaisuwanCrush.png"
        },
    },
    Cosmetic_HoldYourBasket: {
        code_name: "Cosmetic_HoldYourBasket",
        point_slug: "cosmetics",
        display: {
            name: "HoldYourBasket",
            image: "/images/stars/Cosmetic_HoldYourBasket.png"
        },
    },
    Hemp_TheDrink: {
        code_name: "Hemp_TheDrink",
        point_slug: "hemp",
        display: {
            name: "TheDrink",
            image: "/images/stars/Hemp_TheDrink.png"
        },
    },
    KubKaoKabGang_CWheat: {
        code_name: "KubKaoKabGang_CWheat",
        point_slug: "wheat",
        display: {
            name: "CWheat",
            image: "/images/stars/KubKaoKabGang_CWheat.png"
        },
    },
    KubKaoKabGang_PasteScrumble: {
        code_name: "KubKaoKabGang_PasteScrumble",
        point_slug: "paste_scrumble",
        display: {
            name: "PasteScrumble",
            image: "/images/stars/KubKaoKabGang_PasteScrumble.png"
        },
    }
}

function getStarSourceList() {
    let star_list = [];
    for (let i in star_config) {
        star_list.push(star_config[i].code_name);
    }
    return star_list;
}

// Function to get all stars
async function getAllStars(include_used = false) {
    try {
        const all_stars = await Stars.findAll();
        const star_list = [];
        for (let i in all_stars) {
            star_list.push(all_stars[i].dataValues);
        }
        return star_list;
    } catch (error) {
        throw error;
    }
}

// Function to get stars by user_id
async function getStarsByUserId(user_id, include_used = false) {
    try {
        const stars = await Stars.findAll({
            where: {
                user_id: user_id
            }
        });

        console.log("Stars[getStarsByUserId]: stars ->", stars);

        if (!include_used) {

            const unused_stars = [];

            for (let i in stars) {
                console.log(stars[i])
                console.log(stars[i].coupon_uuid)
                console.log(stars[i].coupon_uuid != null)
                if (stars[i].coupon_uuid == null) {
                    unused_stars.push(stars[i].dataValues);
                }
            }
            console.log("There", unused_stars)
            return unused_stars;
        }

        console.log("There", stars)
        return stars;
    }
    catch (error) {
        throw error;
    }
}

// Function to get stars by which source
async function getStarsByWhichSource(source) {
    if (!getStarSourceList().includes(source)) {
        throw new Error("Invalid source name");
    }
    try {
        const stars = await Stars.findAll({
            where: {
                source: source
            }
        });
        return stars;
    }
    catch (error) {
        throw error;
    }
}

// Function to get the star by star_id
async function getStarByStarId(star_id) {
    try {
        const star = await Stars.findOne({
            where: {
                star_id: star_id
            }
        });
        return star;
    }
    catch (error) {
        throw error;
    }
}

// Function to get sum of stars by user_id
async function getSumOfStarsByUserId(user_id) {
    try {
        const sum_of_stars = await Stars.sum('star', {
            where: {
                user_id: user_id
            }
        });
        return sum_of_stars;
    }
    catch (error) {
        throw error;
    }
}


// Function to create a new star
async function createStar(req) {

    console.log("Stars[createStar]: There is a create star request ->", req);

    const user_id = req.user_id;
    const source = req.source;
    const message = req.message;
    if (!getStarSourceList().includes(source)) {
        throw new Error("Invalid source name");
    }

    const new_star = await Stars.create({
        user_id: user_id,
        source: source,
        message: message
    });

    console.log("Stars[createStar]: Star created ->", new_star)

    return new_star.dataValues;
}

// Function to set up a star to the buffer
async function starUp(req) {

    console.log("Stars[starUp]: There is a star up request ->", req);

    const user_star_inv = await getStarInventoryByUserId(req.user_id);

    // check if user has already ten stars for the source
    if (user_star_inv[req.source] >= 10) {
        console.log("Stars[starUp]: User ->", req.user_id, "has already 10 stars for the source ->", req.source);
        return {
            is_success: false,
            message: "User has already 10 stars for the source ->" + req.source,
            content: null
        }
    }

    const new_star = await createStar(req);
    console.log("Stars[starUp]: Performed star up action.");

    await checkIfUserShouldGetMajorCoupon(req.user_id);
    // await fetchUpStarToBBT(new_star);

    return new_star;
}

// Function to check if a user has 7 difference stars for the first time so that he/she can get a major coupon
async function checkIfUserShouldGetMajorCoupon(user_id) {
    try {
        const number_of_different_star_sources = await getNumberOfDifferentStarSourcesByUserId(user_id);
        if (number_of_different_star_sources > 6) {

            // Check if the user has already got the major coupon
            const users_coupons = await Coupon.getCouponsByUserId(user_id);
            for (let i in users_coupons) {
                if (users_coupons[i].dataValues.reward === "major") {
                    return;
                }
            }

            console.log("Stars[checkIfUserShouldGetMajorCoupon]: User ->", user_id, "has 7 different stars for the first time. Creating a major coupon for the user.");

            // Create a major coupon for the user
            const result = await Coupon.majorCouponUp(user_id);
            console.log("Stars[checkIfUserShouldGetMajorCoupon]: Invoked Coupon.majorCouponUp() ->", result);

        }
    } catch (error) {
        throw error;
    }
}

// Function to get star inventory by user_id
// {
//     Accessories_ColorMatching: 1,
//     CoffeeBean_FindMyMeow: 7,
//     CornMilk_RaisuwanCrush: 0,
//     Cosmetic_HoldYourBasket: 3,
//     Hemp_TheDrink: 4,
//     KubKaoKabGang_CWheat: 1,
//     KubKaoKabGang_PasteScrumble: 7
// }
async function getStarInventoryByUserId(user_id, include_used = false) {
    try {
        const star_inv = {}

        for (let i in getStarSourceList()) {
            star_inv[getStarSourceList()[i]] = 0;
        }

        const users_stars = await getStarsByUserId(user_id, include_used);

        for (let i in users_stars) {
            if (!Object.keys(star_inv).includes(users_stars[i].source)) {
                console.warn("Stars[getStarInventoryByUserId]: Invalid star source ->", users_stars[i].source, "for user_id ->", user_id);
                star_inv[users_stars[i].source] = 0;
            }
            star_inv[users_stars[i].source] += 1;
        }

        return star_inv;

    } catch (error) {
        throw error;
    }
}

// Function to get number of different star sources by user_id
async function getNumberOfDifferentStarSourcesByUserId(user_id, include_used = false) {
    try {
        const star_inv = await getStarInventoryByUserId(user_id, include_used);

        let number_of_different_star_sources = 0;
        for (let i in star_inv) {
            if (star_inv[i] > 0) {
                number_of_different_star_sources += 1;
            }
        }

        return number_of_different_star_sources;

    } catch (error) {
        throw error;
    }
}

// Function to mark a star as used
async function useStar(star_id, coupon_uuid) {
    try {
        const star = await getStarByStarId(star_id);
        if (!star) {
            return {
                is_success: false,
                message: "Star not found with the given star_id -> " + star_id,
                content: null
            }
        }
        if (star.dataValues.coupon_uuid != null) {
            return {
                is_success: false,
                message: "Star already used",
                content: null
            }
        }
        star.coupon_uuid = coupon_uuid;
        await Stars.update(star.dataValues, {
            where: {
                star_id: star_id
            }
        });

        return {
            is_success: true,
            message: "Star used successfully",
            content: star
        }

    } catch (error) {
        throw error;
    }
}

// Function to find a star to use
async function findStarToUse(user_id, source) {
    try {
        const stars = await getStarsByUserId(user_id);
        for (let i in stars) {
            if (stars[i].source === source && stars[i].coupon_uuid == null) {
                console.log("Stars[findStarToUse]: Found a star to use ->", stars[i])
                return stars[i];
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// Function sent star to bbt
async function sendStarToBBT(star) {

    console.log("Star[sentStarToBBT]: sending star to bbt ->", star);

    // get access token from user_id
    let token_from_buffer = await User.getUserTokenBufferByUserId(star.user_id);
    console.log("Star[sentStarToBBT]: token_from_buffer ->", token_from_buffer);
    if (!token_from_buffer) throw new Error("Cannot find bbt token from bbt token buffer where user_id = " + star.user_id);

    token_from_buffer = token_from_buffer.bbt_token;
    const query =
        `mutation {
        createPointTransection 
            (createPointTransectionInput: {
            point_slug: "${star_config[star.source].point_slug}"
        })
        {
            id
            user_uid
            point_slug
            type
            amount
            created_at
            updated_at
            deleted_at
        }
    }`

    return await apirequester.requestToBBT(token_from_buffer, query);
}

// Function sent (fetchUp) unsent star to bbt
async function fetchUpStarToBBT(star) {
    console.log("Star[fetchUpStarToBBT]: fetching up star to bbt");

    // const star_ids_that_sent_successfully = [];
    // const point_send_logs = await Point_Send_Logs.findAll();
    // for (let i in point_send_logs) {
    //     if (point_send_logs[i].respond_errors == null) {
    //         star_ids_that_sent_successfully.push(point_send_logs[i].star_id);
    //     }
    // }
    // const stars_to_send = [];
    // const all_stars = await getAllStars();
    // for (let i in all_stars) {
    //     if (!star_ids_that_sent_successfully.includes(all_stars[i].star_id)) {
    //         if (![1,2,3].includes(all_stars[i].user_id)) stars_to_send.push(all_stars[i]);
    //     }
    // }

    // for (let i in stars_to_send) {
    const respond = await sendStarToBBT(star);
    console.log("Star[fetchUpStarToBBT]: respond ->", respond)
    let respond_err = null;
    if (Object.keys(respond).includes("errors")) {
        if (respond.errors != null){
            respond_err = respond.errors
        }
    }
    let respond_data = respond.data;
    if (respond_data === undefined || respond_data == null) respond_data = null;

    await Point_Send_Logs.create({
        star_id: stars_to_send[i].star_id,
        respond_data: respond_data,
        respond_errors: respond_err
    });
    // }

    console.log("Star[fetchUpStarToBBT]: done fetching up star to bbt");
}

module.exports = {
    getAllStars,
    getStarsByUserId,
    getStarsByWhichSource,
    getStarByStarId,
    getSumOfStarsByUserId,
    createStar,
    starUp,
    getStarInventoryByUserId,
    getNumberOfDifferentStarSourcesByUserId,
    getStarSourceList,
    star_config,
    useStar,
    findStarToUse,
    sendStarToBBT,
    fetchUpStarToBBT
}
