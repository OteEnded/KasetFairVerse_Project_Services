const Stars = require('../entities/Stars');
const user = require('../models/User');

const star_source_code = {
    Accessories_ColorMatching: "Accessories_ColorMatching",
    CoffeeBean_FindMyMeow: "CoffeeBean_FindMyMeow",
    CornMilk_RaisuwanCrush: "CornMilk_RaisuwanCrush",
    Cosmetic_HoldYourBasket: "Cosmetic_HoldYourBasket",
    Hemp_TheDrink: "Hemp_TheDrink",
    KubKaoKabGang_CWheat: "KubKaoKabGang_CWheat",
    KubKaoKabGang_PasteScrumble: "KubKaoKabGang_PasteScrumble",
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

        console.log("Stars[getStarsByUserId]: stars ->", stars);

        if (!include_used) {
            for (let i in stars) {
                if (stars[i].dataValues.coupon_uuid != null) {
                    stars.splice(i, 1);
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

    console.log("Stars[starUp]: Performed star action.");
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


module.exports = {

}
