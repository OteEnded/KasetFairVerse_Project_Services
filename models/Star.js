const Stars = require('../entities/Stars');
const Point_Sent_Logs = require('../entities/Point_Sent_Logs');
const Point_Sent_Fail_Logs = require('../entities/Point_Sent_Fail_Logs');
const user = require('../models/User');
const apirequester = require('../services/apirequester');

const game_list = [
    "Accessories_ColorMatching",
    "CoffeeBean_FindMyMeow",
    "CornMilk_RaisuwanCrush",
    "Cosmetic_HoldYourBasket",
    "Hemp_TheDrink",
    "KubKaoKabGang_CWheat",
    "KubKaoKabGang_PasteScrumble"
];

const game_name_point_slug_dict = {
    "Accessories_ColorMatching": "accessories",
    "CoffeeBean_FindMyMeow": "coffee_bean",
    "CornMilk_RaisuwanCrush": "raisuwan",
    "Cosmetic_HoldYourBasket": "cosmetics",
    "Hemp_TheDrink": "hemp",
    "KubKaoKabGang_CWheat": "wheat",
    "KubKaoKabGang_PasteScrumble": "paste_scrumble"
}

// Function to get all star buffers
async function getAllStarBuffers() {
    try {
        const all_star_buffers = await Stars.findAll();
        const star_buffer_list = [];
        for (let i in all_star_buffers) {
            star_buffer_list.push(all_star_buffers[i].dataValues);
        }
        return star_buffer_list;
    } catch (error) {
        throw error;
    }
}

// Function to get star buffer by user_id
async function getStarBufferByUserId(user_id) {
    try {
        const star_buffer = await Stars.findOne({
            where: {
                user_id: user_id
            }
        });
        return star_buffer;
    }
    catch (error) {
        throw error;
    }
}

// Function to get star buffer by which game
async function getStarBufferByWhichGame(which_game) {
    if (!game_list.includes(which_game)) {
        throw new Error("Invalid game name");
    }
    try {
        const star_buffer = await Stars.findOne({
            where: {
                from_game: which_game
            }
        });
        return star_buffer;
    }
    catch (error) {
        throw error;
    }
}

// Function to get star buffer by star_id
async function getStarBufferByStarId(star_id) {
    try {
        const star_buffer = await Stars.findOne({
            where: {
                star_id: star_id
            }
        });
        return star_buffer;
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

// Function to get sum of stars by which game
async function getSumOfStarsByWhichGame(which_game) {
    if (!game_list.includes(which_game)) {
        throw new Error("Invalid game name");
    }
    try {
        const sum_of_stars = await Stars.sum('star', {
            where: {
                from_game: which_game
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

// Function to set up a star to the buffer
async function starUp(user_id, which_game) {
    if (!game_list.includes(which_game)) {
        throw new Error("Invalid game name");
    }

    await Stars.create({
        user_id: user_id,
        from_game: which_game
    });

    await fetchUpStarToBBT();
}



// Function sent star to bbt
async function sendStarToBBT(star) {

    console.log("Stars[sentStarToBBT]: sending star to bbt ->", star);

    // get access token from user_id
    let token_from_buffer = await user.getUserTokenBufferByUserId(star.user_id);
    console.log("Stars[sentStarToBBT]: token_from_buffer ->", token_from_buffer);
    if (!token_from_buffer) throw new Error("Cannot find bbt token from bbt token buffer where user_id = " + star.user_id);

    token_from_buffer = token_from_buffer.bbt_token;
    const query =
    `mutation {
        createPointTransection 
            (createPointTransectionInput: {
            point_slug: "${game_name_point_slug_dict[star.from_game]}"
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
    let unsent_star_buffer_list = await getAllStarBuffers();
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

// Function to get stars a user has played
// {
//     Accessories/ColorMatching: 1,
//     CoffeeBean/FindMyMeow: 7,
//     CornMilk/RaisuwanCrush 0,
//     Cosmetic/HoldYourBasket: 3,
//     Strawberry: 2,
//     Hemp/TheDrink: 4.
//     KubKaoKabGang/CWheat: 1,
//     KubKaoKabGang/PasteScrumble: 7
// }

// async function checkUserHasAllDifferenceStar(user_id) {
//     try {
//         const star_inv = {
//             Accessories/ColorMatching: 0
//         }
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = {
    getAllStarBuffers,
    getStarBufferByUserId,
    getStarBufferByWhichGame,
    getStarBufferByStarId,
    getSumOfStarsByUserId,
    getSumOfStarsByWhichGame,
    getAllPointSentLogs,
    getPointSentLogByStarId,
    starUp,
    fetchUpStarToBBT
}
