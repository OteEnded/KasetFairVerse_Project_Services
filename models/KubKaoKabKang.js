const KubKaoKabKang_PasteScrumble_PlayRecords = require('../entities/KubKaoKabKang_PasteScrumble_PlayRecords');
const KubKaoKabKang_CWheat_PlayRecords = require('../entities/KubKaoKabKang_CWheat_PlayRecords');

// Function to get all PasteScrumble play records
async function getAllPasteScrumblePlayRecords() {
    try {
        const all_play_records = await KubKaoKabKang_PasteScrumble_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw error;
    }
}

// Function to get PasteScrumble play records by user_id
async function getPasteScrumblePlayRecordsByUserId(user_id) {
    try {
        const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.findAll({
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

// Function to get PasteScrumble play records by round_id
async function getPasteScrumblePlayRecordsByRoundId(round_id) {
    try {
        const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.findOne({
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

// Function to get sum of PasteScrumble scores by user_id
async function getSumOfPasteScrumbleScoresByUserId(user_id) {
    try {
        const sum_of_scores = await KubKaoKabKang_PasteScrumble_PlayRecords.sum('score', {
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

// Function to get PasteScrumble high scores of a user by user_id
async function getPasteScrumbleHighScoresByUserId(user_id) {
    try {
        const high_scores = await KubKaoKabKang_PasteScrumble_PlayRecords.max('score', {
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

// Function to find PasteScrumble play records
async function findPasteScrumblePlayRecords(column, value) {
    try {
        const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.findAll({
            where: {
                [column]: value
            }
        });
        return play_record;
    }
    catch (error) {
        throw error;
    }
}

// Function to create a PasteScrumble play record
async function createPasteScrumblePlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to update a PasteScrumble play record
async function updatePasteScrumblePlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return req;
    } catch (error) {
        throw error;
    }
}

// Function to delete a PasteScrumble play record
async function deletePasteScrumblePlayRecord(round_id) {
    try {
        const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        if (!play_record){
            return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
        }
        await KubKaoKabKang_PasteScrumble_PlayRecords.destroy({
                where: {
                    round_id: round_id
                }
        });
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to get all CWheat play records
async function getAllCWheatPlayRecords() {
    try {
        const all_play_records = await KubKaoKabKang_CWheat_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw error;
    }
}

// Function to get CWheat play records by user_id
async function getCWheatPlayRecordsByUserId(user_id) {
    try {
        const play_record = await KubKaoKabKang_CWheat_PlayRecords.findAll({
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

// Function to get CWheat play records by round_id
async function getCWheatPlayRecordsByRoundId(round_id) {
    try {
        const play_record = await KubKaoKabKang_CWheat_PlayRecords.findOne({
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

// Function to get sum of CWheat scores by user_id
async function getSumOfCWheatScoresByUserId(user_id) {
    try {
        const sum_of_scores = await KubKaoKabKang_CWheat_PlayRecords.sum('score', {
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

// Function to get CWheat high scores of a user by user_id
async function getCWheatHighScoresByUserId(user_id) {
    try {
        const high_scores = await KubKaoKabKang_CWheat_PlayRecords.max('score', {
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

// Function to find CWheat play records
async function findCWheatPlayRecords(column, value) {
    try {
        const play_record = await KubKaoKabKang_CWheat_PlayRecords.findAll({
            where: {
                [column]: value
            }
        });
        return play_record;
    }
    catch (error) {
        throw error;
    }
}

// Function to create a CWheat play record
async function createCWheatPlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_CWheat_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to update a CWheat play record
async function updateCWheatPlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_CWheat_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return req;
    } catch (error) {
        throw error;
    }
}

// Function to delete a CWheat play record
async function deleteCWheatPlayRecord(round_id) {
    try {
        const play_record = await KubKaoKabKang_CWheat_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        if (!play_record){
            return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
        }
        await KubKaoKabKang_CWheat_PlayRecords.destroy({
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
    getAllPasteScrumblePlayRecords,
    getPasteScrumblePlayRecordsByUserId,
    getPasteScrumblePlayRecordsByRoundId,
    getSumOfPasteScrumbleScoresByUserId,
    getPasteScrumbleHighScoresByUserId,
    findPasteScrumblePlayRecords,
    createPasteScrumblePlayRecord,
    updatePasteScrumblePlayRecord,
    deletePasteScrumblePlayRecord,
    getAllCWheatPlayRecords,
    getCWheatPlayRecordsByUserId,
    getCWheatPlayRecordsByRoundId,
    getSumOfCWheatScoresByUserId,
    getCWheatHighScoresByUserId,
    findCWheatPlayRecords,
    createCWheatPlayRecord,
    updateCWheatPlayRecord,
    deleteCWheatPlayRecord
};
