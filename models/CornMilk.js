const CornMilk_RaisuwanCrush_PlayRecords = require('../entities/CornMilk_RaisuwanCrush_PlayRecords');

// Function to get all RaisuwanCrush play records
async function getAllRaisuwanCrushPlayRecords() {
    try {
        const all_play_records = await CornMilk_RaisuwanCrush_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw error;
    }
}

// Function to get RaisuwanCrush play records by user_id
async function getRaisuwanCrushPlayRecordsByUserId(user_id) {
    try {
        const play_record = await CornMilk_RaisuwanCrush_PlayRecords.findAll({
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

// Function to get RaisuwanCrush play record by round_id
async function getRaisuwanCrushPlayRecordsByRoundId(round_id) {
    try {
        const play_record = await CornMilk_RaisuwanCrush_PlayRecords.findOne({
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

// Function to get sum of RaisuwanCrush scores by user_id
async function getSumOfRaisuwanCrushScoresByUserId(user_id) {
    try {
        const sum_of_scores = await CornMilk_RaisuwanCrush_PlayRecords.sum('score', {
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

// Function to get RaisuwanCrush high scores of a user by user_id
async function getRaisuwanCrushHighScoresByUserId(user_id) {
    try {
        const high_scores = await CornMilk_RaisuwanCrush_PlayRecords.max('score', {
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

// Function to get RaisuwanCrush the highest scores record of all records
async function getRaisuwanCrushHighestScoresRecord() {
    try {
        const high_scores = await CornMilk_RaisuwanCrush_PlayRecords.max('score');
        return high_scores;
    }
    catch (error) {
        throw error;
    }
}

// Function to find RaisuwanCrush play records
async function findRaisuwanCrushPlayRecords(column, value) {
    try {
        const play_records = await CornMilk_RaisuwanCrush_PlayRecords.findAll({
            where: {
                [column]: value
            }
        });
        return play_records;
    } catch (error) {
        throw error;
    }
}

// Function to create a RaisuwanCrush play record
async function createRaisuwanCrushPlayRecord(req) {
    try {
        const play_record = await CornMilk_RaisuwanCrush_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to update a RaisuwanCrush play record
async function updateRaisuwanCrushPlayRecord(req) {
    try {
        const play_record = await CornMilk_RaisuwanCrush_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to delete a RaisuwanCrush play record
async function deleteRaisuwanCrushPlayRecord(round_id) {
    try {
        const play_record = await CornMilk_RaisuwanCrush_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        if (!play_record){
            return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
        }
        await CornMilk_RaisuwanCrush_PlayRecords.destroy({
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
    getAllRaisuwanCrushPlayRecords,
    getRaisuwanCrushPlayRecordsByUserId,
    getRaisuwanCrushPlayRecordsByRoundId,
    getSumOfRaisuwanCrushScoresByUserId,
    getRaisuwanCrushHighScoresByUserId,
    getRaisuwanCrushHighestScoresRecord,
    findRaisuwanCrushPlayRecords,
    createRaisuwanCrushPlayRecord,
    updateRaisuwanCrushPlayRecord,
    deleteRaisuwanCrushPlayRecord
};
