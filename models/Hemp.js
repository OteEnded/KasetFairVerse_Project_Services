const Hemp_TheDrink_PlayRecords = require('../entities/Hemp_TheDrink_PlayRecords');

// Function to get all Hemp TheDrink play records
function getTheDrinkEndingList() {
    return ["Chocolate", "Coffee", "Plain", "Skim", "Strawberry", "Sweet"];
}

// Function to get all Hemp TheDrink play records
async function getAllTheDrinkPlayRecords() {
    try {
        const test = await Hemp_TheDrink_PlayRecords;
        const all_play_records = await Hemp_TheDrink_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw error;
    }
}

// Function to get Hemp TheDrink play records by user_id
async function getTheDrinkPlayRecordsByUserId(user_id) {
    try {
        const play_record = await Hemp_TheDrink_PlayRecords.findAll({
            where: {
                user_id: user_id
            }
        });
        return play_record;
    }
    catch (error) {
        throw error;
    }
}

// Function to get Hemp TheDrink play record by round_id
async function getTheDrinkPlayRecordsByRoundId(round_id) {
    try {
        const play_record = await Hemp_TheDrink_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        return play_record;
    }
    catch (error) {
        throw error;
    }
}

// Function to get how many different TheDrink endings a user has played
async function getNumberOfDifferentTheDrinkEndingsPlayed(user_id) {
    try {
        let player_progress = await getTheDrinkProgressByUserId(user_id);
        let number_of_endings = 0;
        for (i in getTheDrinkEndingList()) {
            if (player_progress[getTheDrinkEndingList()[i]] > 0) {
                number_of_endings += 1;
            }
        }
        return number_of_endings;
    }
    catch (error) {
        throw error;
    }
}

// Function to get TheDrink progress a user has played
// {
//     Chocolate: 1,
//     Coffee: 7,
//     Plain 0,
//     Skim: 3,
//     Strawberry: 2,
//     Sweet: 4
// }
async function getTheDrinkProgressByUserId(user_id) {
    try {
        const progress = {
            Chocolate: 0,
            Coffee: 0,
            Plain: 0,
            Skim: 0,
            Strawberry: 0,
            Sweet: 0
        }
        const play_records = await Hemp_TheDrink_PlayRecords.findAll({
            where: {
                user_id: user_id
            }
        });
        for (i in play_records) {
            progress[play_records[i].dataValues.ending] += 1;
        }
        return progress;
    }
    catch (error) {
        throw error;
    }
}

// Function to find Hemp TheDrink play records
async function findTheDrinkPlayRecords(column, value) {
    try {
        const play_records = await Hemp_TheDrink_PlayRecords.findAll({
            where: {
                [column]: value
            }
        });
        return play_records;
    } catch (error) {
        throw error;
    }
}

// Function to create a Hemp TheDrink play record
async function createTheDrinkPlayRecord(req) {
    try {
        const play_record = await Hemp_TheDrink_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to update a Hemp TheDrink play record
async function updateTheDrinkPlayRecord(req) {
    try {
        const play_record = await Hemp_TheDrink_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to delete a Hemp TheDrink play record
async function deleteTheDrinkPlayRecord(round_id) {
    try {
        const play_record = await Hemp_TheDrink_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        if (!play_record){
            return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
        }
        await Hemp_TheDrink_PlayRecords.destroy({
            where: {
                round_id: round_id
            }
        });
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Exporting functions
module.exports.getAllTheDrinkPlayRecords = getAllTheDrinkPlayRecords
module.exports = {
    getAllTheDrinkPlayRecords,
    getTheDrinkPlayRecordsByUserId,
    getTheDrinkPlayRecordsByRoundId,
    getNumberOfDifferentTheDrinkEndingsPlayed,
    getTheDrinkProgressByUserId,
    findTheDrinkPlayRecords,
    createTheDrinkPlayRecord,
    updateTheDrinkPlayRecord,
    deleteTheDrinkPlayRecord
};
