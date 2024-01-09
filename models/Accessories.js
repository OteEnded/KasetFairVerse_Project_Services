const Accessories_ColorMatching_PlayRecords = require('../entities/Accessories_ColorMatching_PlayRecords');

// Function to get all ColorMatching play records
async function getAllColorMatchingPlayRecords() {
    try {
        const all_play_records = await Accessories_ColorMatching_PlayRecords.findAll();
        var play_record_list = [];
        for (i in all_play_records) {
            play_record_list.push(all_play_records[i].dataValues);
        }
        return play_record_list;
    } catch (error) {
        throw error;
    }
}

// Function to get ColorMatching play records by user_id
async function getColorMatchingPlayRecordsByUserId(user_id) {
    try {
        const play_record = await Accessories_ColorMatching_PlayRecords.findAll({
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

// Function to get ColorMatching play record by round_id
async function getColorMatchingPlayRecordsByRoundId(round_id) {
    try {
        const play_record = await Accessories_ColorMatching_PlayRecords.findOne({
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

// Function to get win stat
// {
//     u
// }

// Function to find ColorMatching play records
async function findColorMatchingPlayRecords(column, value) {
    try {
        const play_records = await Accessories_ColorMatching_PlayRecords.findAll({
            where: {
                [column]: value
            }
        });
        return play_records;
    } catch (error) {
        throw error;
    }
}

// Function to create a ColorMatching play record
async function createColorMatchingPlayRecord(req) {
    try {
        const play_record = await Accessories_ColorMatching_PlayRecords.create(req);
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to update a ColorMatching play record
async function updateColorMatchingPlayRecord(req) {
    try {
        const play_record = await Accessories_ColorMatching_PlayRecords.update(req, {
            where: {
                round_id: req.body.round_id
            }
        });
        return play_record;
    } catch (error) {
        throw error;
    }
}

// Function to delete a ColorMatching play record
async function deleteColorMatchingPlayRecord(round_id) {
    try {
        const play_record = await Accessories_ColorMatching_PlayRecords.findOne({
            where: {
                round_id: round_id
            }
        });
        if (!play_record){
            return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
        }
        await Accessories_ColorMatching_PlayRecords.destroy({
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

};
