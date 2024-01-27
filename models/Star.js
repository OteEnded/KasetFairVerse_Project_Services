const Stars = require('../entities/Stars');
const Star_Usages = require('../entities/Star_Usages');
const Point_Sent_Logs = require('../entities/Point_Sent_Logs');
const Point_Sent_Fail_Logs = require('../entities/Point_Sent_Fail_Logs');
const user = require('../models/User');
const apirequester = require('../services/apirequester');

const star_source_code = {
    Accessories_ColorMatching: "Accessories_ColorMatching",
    CoffeeBean_FindMyMeow: "CoffeeBean_FindMyMeow",
    CornMilk_RaisuwanCrush: "CornMilk_RaisuwanCrush",
    Cosmetic_HoldYourBasket: "Cosmetic_HoldYourBasket",
    Hemp_TheDrink: "Hemp_TheDrink",
    KubKaoKabGang_CWheat: "KubKaoKabGang_CWheat",
    KubKaoKabGang_PasteScrumble: "KubKaoKabGang_PasteScrumble",
    // Major: "Major",
    // Special: "Special",
    // Test: "Test"
}

function getStarSourceList() {
    let star_list = [];
    for (let i in star_source_code) {
        star_list.push(star_source_code[i]);
    }
    return star_list;
}

const star_source_point_slug_dict = {
    "Accessories_ColorMatching": "accessories",
    "CoffeeBean_FindMyMeow": "coffee_bean",
    "CornMilk_RaisuwanCrush": "raisuwan",
    "Cosmetic_HoldYourBasket": "cosmetics",
    "Hemp_TheDrink": "hemp",
    "KubKaoKabGang_CWheat": "wheat",
    "KubKaoKabGang_PasteScrumble": "paste_scrumble"
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
        if (!include_used) {
            const star_usages = await Star_Usages.findAll();
            for (let i in star_usages) {
                for (let j in stars) {
                    if (star_usages[i].dataValues.star_id === stars[j].dataValues.star_id) {
                        stars.splice(j, 1);
                    }
                }
            }
        }
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

// Function to get sum of stars by source
async function getSumOfStarsBySource(source) {
    if (!getStarSourceList().includes(source)) {
        throw new Error("Invalid source name");
    }
    try {
        const sum_of_stars = await Stars.sum('star', {
            where: {
                source: source
            }
        });
        return sum_of_stars;
    }
    catch (error) {
        throw error;
    }
}

// Function to get all point sent logs
async function getAllPointSentLogs() {
    try {
        const all_point_sent_logs = await Point_Sent_Logs.findAll();
        const point_sent_log_list = [];
        for (let i in all_point_sent_logs) {
            point_sent_log_list.push(all_point_sent_logs[i].dataValues);
        }
        return point_sent_log_list;
    } catch (error) {
        throw error;
    }
}

// Function to get point sent log by star_id
async function getPointSentLogByStarId(star_id) {
    try {
        const point_sent_log = await Point_Sent_Logs.findOne({
            where: {
                star_id: star_id
            }
        });
        return point_sent_log;
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

    console.log("Stars[createStar]: Ttar created ->", new_star)

    return new_star;
}

// Function to set up a star to the buffer
async function starUp(req) {

    console.log("Stars[starUp]: There is a star up request ->", req);

    await createStar(req);

    await fetchUpStarToBBT();

    console.log("Stars[starUp]: Performed star action.");
}


// Function sent star to bbt
async function sendStarToBBT(star) {

    console.log("Stars[sentStarToBBT]: sending star to bbt ->", star);

    // get access token from user_id
    let token_from_buffer = await user.getUserTokenBufferByUserId(star.user_id);
    console.log("Stars[sentStarToBBT]: token_from_buffer ->", token_from_buffer);
    if (!token_from_buffer) {
        console.error("Stars[sentStarToBBT]: cannot find bbt token from bbt token buffer where user_id = " + star.user_id);
        return "Cannot find bbt token from bbt token buffer where user_id = " + star.user_id;
    }

    token_from_buffer = token_from_buffer.bbt_token;
    const query =
    `mutation {
        createPointTransection 
            (createPointTransectionInput: {
            point_slug: "${star_source_point_slug_dict[star.source]}"
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
async function fetchUpStarToBBT() {
    console.log("Stars[fetchUpStarToBBT]: fetching up star to bbt");

    // get all unsent star from star buffer
    let unsent_star_buffer_list = await getAllStars();
    const point_sent_log_list = await getAllPointSentLogs();
    for (let i in point_sent_log_list) {
        const point_sent_log = point_sent_log_list[i];
        for (let j in unsent_star_buffer_list) {
            const unsent_star_buffer = unsent_star_buffer_list[j];
            if (point_sent_log.star_id === unsent_star_buffer.star_id) {
                console.log("Stars[fetchUpStarToBBT]: removing sent star from unsent star buffer list ->", unsent_star_buffer);
                unsent_star_buffer_list.splice(j, 1);
            }
        }
    }

    console.log("Stars[fetchUpStarToBBT]: unsent star buffer list ->", unsent_star_buffer_list);

    // send all unsent star to bbt
    for (let i in unsent_star_buffer_list) {
        let star_buffer = unsent_star_buffer_list[i];
        console.log("Stars[fetchUpStarToBBT]: sending star to bbt ->", star_buffer);
        let res = await sendStarToBBT(star_buffer);
        console.log("Stars[fetchUpStarToBBT]: res ->", res);
        if (Object.keys(res).includes("errors") || res.data == null) {
            console.error("Stars[fetchUpStarToBBT]: error while sending star to bbt ->", res);
            await Point_Sent_Fail_Logs.create({
                star_id: star_buffer.star_id,
                respond: res
            });
            continue;
        }
        await Point_Sent_Logs.create({
            bbt_point_id: res.data.createPointTransection.id,
            star_id: star_buffer.star_id,
            bbt_user_uuid: res.data.createPointTransection.user_uid,
            point_slug: res.data.createPointTransection.point_slug,
            type: res.data.createPointTransection.type,
            amount: res.data.createPointTransection.amount,
            created_at: res.data.createPointTransection.created_at,
            updated_at: res.data.createPointTransection.updated_at,
            deleted_at: res.data.createPointTransection.deleted_at
        });
    }

    console.log("Stars[fetchUpStarToBBT]: done fetching up star to bbt");
}

// Function to get star inventory by user_id
// {
//     Accessories_ColorMatching: 1,
//     CoffeeBean_FindMyMeow: 7,
//     CornMilk_RaisuwanCrush 0,
//     Cosmetic_HoldYourBasket: 3,
//     Hemp_TheDrink: 4.
//     KubKaoKabGang_CWheat: 1,
//     KubKaoKabGang_PasteScrumble: 7
// }
async function getStarInventoryByUserId(user_id, include_used = false) {
    try {
        const star_inv = {}

        const users_stars = await getStarsByUserId(user_id, include_used);
        
        for (let i in users_stars) {
            if (!Object.keys(star_inv).includes(users_stars[i].dataValues.source)) {
                star_inv[users_stars[i].dataValues.source] = 0;
            }
            star_inv[users_stars[i].dataValues.source] += 1;
        }

        return star_inv;

    } catch (error) {
        throw error;
    }
}

// Function to get number of different star sources by user_id
async function getNumberOfDifferentStarSourcesByUserId(user_id) {
    try {
        const star_inv = await getStarInventoryByUserId(user_id);
        return Object.keys(star_inv).length;
    } catch (error) {
        throw error;
    }
}

// // Function to get number of different star game by user_id
// async function getNumberOfDifferentStarGamesByUserId(user_id) {
//     try {
//         const game_list = [
//             "Accessories_ColorMatching",
//             "CoffeeBean_FindMyMeow",
//             "CornMilk_RaisuwanCrush",
//             "Cosmetic_HoldYourBasket",
//             "Hemp_TheDrink",
//             "KubKaoKabGang_CWheat",
//             "KubKaoKabGang_PasteScrumble"
//         ]
//         let numberOfDifferentStarGames = 0;
//         const star_inv = await getStarInventoryByUserId(user_id);
//         for (let i in game_list) {
//             if (Object.keys(star_inv).includes(game_list[i])) {
//                 numberOfDifferentStarGames += 1;
//             }
//         }
//         return numberOfDifferentStarGames;
//
//     } catch (error) {
//         throw error;
//     }
// }


module.exports = {
    star_source_code,
    getAllStars,
    getStarsByUserId,
    getStarsByWhichSource,
    getStarByStarId,
    getSumOfStarsByUserId,
    getSumOfStarsBySource,
    getAllPointSentLogs,
    getPointSentLogByStarId,
    starUp,
    fetchUpStarToBBT,
    getStarInventoryByUserId,
    getNumberOfDifferentStarSourcesByUserId,
    // getNumberOfDifferentStarGamesByUserId
}
