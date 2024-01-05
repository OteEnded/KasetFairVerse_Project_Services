const KubKaoKabKang_PlayRecords = require('../entities/KubKaoKabKang_PlayRecords');

// Function to get all play records
async function getAllPlayRecords() {
    try {
        const all_play_records = await KubKaoKabKang_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw new Error(`Error fetching play records: ${error.message}`);
    }
}

// Function to get play records by user_id
async function getPlayRecordsByUserId(user_id) {
    try {
        const play_record = await KubKaoKabKang_PlayRecords.findAll({
            where: {
                user_id: user_id
            }
        });
        return play_record;
    }
    catch (error) {
        throw new Error(`Error fetching play records: ${error.message}`);
    }
}

// Function to get play records by round_id
async function getPlayRecordsByRoundId(round_id) {
    try {
        const play_record = await KubKaoKabKang_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        return play_record;
    }
    catch (error) {
        throw new Error(`Error fetching play records: ${error.message}`);
    }
}

// Function to get sum of scores by user_id
async function getSumOfScoresByUserId(user_id) {
    try {
        const sum_of_scores = await KubKaoKabKang_PlayRecords.sum('score', {
            where: {
                user_id: user_id
            }
        });
        return sum_of_scores;
    }
    catch (error) {
        throw new Error(`Error fetching sum of scores: ${error.message}`);
    }
}

// Function to create a play record
async function createPlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw new Error(`Error creating play record: ${error.message}`);
    }
}

// Function to update a play record
async function updatePlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return play_record;
    } catch (error) {
        throw new Error(`Error updating play record: ${error.message}`);
    }
}

// Function to delete a play record
async function deletePlayRecord(req) {
    try {
        const play_record = await KubKaoKabKang_PlayRecords.destroy({
            where: {
                round_id: req.body.round_id
            }
        });
        return play_record;
    } catch (error) {
        throw new Error(`Error deleting play record: ${error.message}`);
    }
}


// Exporting functions
module.exports = {
    getAllPlayRecords,
    getPlayRecordsByUserId,
    getPlayRecordsByRoundId,
    getSumOfScoresByUserId,
    createPlayRecord,
    updatePlayRecord,
    deletePlayRecord
};
