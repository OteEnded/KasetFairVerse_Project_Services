const sequelize = require('sequelize');
const Accessories_ColorMatching_PlayRecords = require('../entities/Accessories_ColorMatching_PlayRecords');
const Star = require('../models/Star');

// Function to get all ColorMatching play records
async function getAllColorMatchingPlayRecords() {
    try {
        const all_play_records = await Accessories_ColorMatching_PlayRecords.findAll();
        const play_record_list = [];
        for (let i in all_play_records) {
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

// Function to get players win stat and sort from most win amount
// {
//     user1: 5,
//     user2: 2,
//     user3: 1,
//     ...
// }
async function getLeaderBoard(range = -1){
    try {
        let leader_board = await Accessories_ColorMatching_PlayRecords.findAll({
            attributes: ['user_id', [sequelize.fn('COUNT', sequelize.col('is_win')), 'win_count']],
            group: ['user_id'],
            raw: true
        });

        // Sort win_stat from most win amount
        leader_board.sort((a, b) => {
            return b.win_count - a.win_count;
        });

        // Reduce leader_board to range
        if (range > 0) {
            leader_board = leader_board.slice(0, range);
        }

        return leader_board;
    } catch (error) {
        throw error;
    }
}

// Function to get win amount by user_id
async function getUserWinAmount(user_id){
    try {
        const leader_board = await getLeaderBoard();
        let win_amount = 0;
        for (i in leader_board) {
            if (leader_board[i].user_id == user_id) {
                win_amount = leader_board[i].win_count;
                break;
            }
        }
        console.log("Here", leader_board);
        return win_amount;
    } catch (error) {
        throw error;
    }
}

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
        await colorMatchingStarUp(play_record);
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

// Function to check if user should be given a ColorMatching star and perform star up if so
async function colorMatchingStarUp(play_record) {
    try {
        const is_win = play_record.is_win;
        if (!is_win) return;

        await Star.starUp({
            user_id: play_record.user_id,
            source: Star.star_config.Accessories_ColorMatching.code_name,
            message: "Game star from Accessories_ColorMatching at " + play_record
        });

    } catch (error) {
        throw error;
    }
}


// Exporting functions
module.exports = {
    getAllColorMatchingPlayRecords,
    getColorMatchingPlayRecordsByUserId,
    getColorMatchingPlayRecordsByRoundId,
    getLeaderBoard,
    getUserWinAmount,
    findColorMatchingPlayRecords,
    createColorMatchingPlayRecord,
    updateColorMatchingPlayRecord,
    deleteColorMatchingPlayRecord
};
