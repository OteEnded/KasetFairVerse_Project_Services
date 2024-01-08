const Cosmetic_HoldYourBasket_PlayRecords = require('../entities/Cosmetic_HoldYourBasket_PlayRecords');

// Function to get all HoldYourBasket play records
async function getAllHoldYourBasketPlayRecords() {
    try {
        const all_play_records = await Cosmetic_HoldYourBasket_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw error;
    }
}

// Function to get HoldYourBasket play records by user_id
async function getHoldYourBasketPlayRecordsByUserId(user_id) {
    try {
        const play_record = await Cosmetic_HoldYourBasket_PlayRecords.findAll({
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

// Function to get HoldYourBasket play record by round_id
async function getHoldYourBasketPlayRecordsByRoundId(round_id) {
    try {
        const play_record = await Cosmetic_HoldYourBasket_PlayRecords.findOne({
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

// Function to get sum of HoldYourBasket scores by user_id
async function getSumOfHoldYourBasketScoresByUserId(user_id) {
    try {
        const sum_of_scores = await Cosmetic_HoldYourBasket_PlayRecords.sum('score', {
            where: {
                user_id: user_id
            }
        });
        return sum_of_scores;
    }
    catch (error) {
        throw error;
    }
}

// Function to get HoldYourBasket high scores of a user by user_id
async function getHoldYourBasketHighScoresByUserId(user_id) {
    try {
        const high_scores = await Cosmetic_HoldYourBasket_PlayRecords.max('score', {
            where: {
                user_id: user_id
            }
        });
        return high_scores;
    }
    catch (error) {
        throw error;
    }
}

// Function to find HoldYourBasket play records
async function findHoldYourBasketPlayRecords(column, value) {
    try {
        const play_records = await Cosmetic_HoldYourBasket_PlayRecords.findAll({
            where: {
                [column]: value
            }
        });
        return play_records;
    } catch (error) {
        throw error;
    }
}

// Function to create a HoldYourBasket play record
async function createHoldYourBasketPlayRecord(req) {
    try {
        const play_record = await Cosmetic_HoldYourBasket_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to update a HoldYourBasket play record
async function updateHoldYourBasketPlayRecord(req) {
    try {
        const play_record = await Cosmetic_HoldYourBasket_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to delete a HoldYourBasket play record
async function deleteHoldYourBasketPlayRecord(round_id) {
    try {
        const play_record = await Cosmetic_HoldYourBasket_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        if (!play_record){
            return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
        }
        await Cosmetic_HoldYourBasket_PlayRecords.destroy({
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
module.exports = {
    getAllHoldYourBasketPlayRecords,
    getHoldYourBasketPlayRecordsByUserId,
    getHoldYourBasketPlayRecordsByRoundId,
    getSumOfHoldYourBasketScoresByUserId,
    getHoldYourBasketHighScoresByUserId,
    findHoldYourBasketPlayRecords,
    createHoldYourBasketPlayRecord,
    updateHoldYourBasketPlayRecord,
    deleteHoldYourBasketPlayRecord
};
