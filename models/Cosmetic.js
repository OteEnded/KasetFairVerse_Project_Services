const Cosmetic_HoldYourBasket_PlayRecords = require('../entities/Cosmetic_HoldYourBasket_PlayRecords');

// // Function to get all play records
// async function getAllPasteScrumblePlayRecords() {
//     try {
//         const all_play_records = await KubKaoKabKang_PasteScrumble_PlayRecords.findAll();
//         var play_record_list = [];
//         for (i in all_play_records) {
//             play_record_list.push(all_play_records[i].dataValues);
//         }
//         return play_record_list;
//     } catch (error) {
//         throw error;
//     }
// }

//

// // Function to get play records by user_id
// async function getPasteScrumblePlayRecordsByUserId(user_id) {
//     try {
//         const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.findAll({
//             where: {
//                 user_id: user_id
//             }
//         });
//         return play_record;
//     }
//     catch (error) {
//         throw error;
//     }
// }
//
// // Function to get play records by round_id
// async function getPasteScrumblePlayRecordsByRoundId(round_id) {
//     try {
//         const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.findOne({
//             where: {
//                 round_id: round_id
//             }
//         });
//         return play_record;
//     }
//     catch (error) {
//         throw error;
//     }
// }
//
// // Function to get sum of scores by user_id
// async function getSumOfPasteScrumbleScoresByUserId(user_id) {
//     try {
//         const sum_of_scores = await KubKaoKabKang_PasteScrumble_PlayRecords.sum('score', {
//             where: {
//                 user_id: user_id
//             }
//         });
//         return sum_of_scores;
//     }
//     catch (error) {
//         throw error;
//     }
// }
//
// // Function to get high scores of a user by user_id
// async function getHighScoresByUserId(user_id) {
//     try {
//         const high_scores = await KubKaoKabKang_PasteScrumble_PlayRecords.max('score', {
//             where: {
//                 user_id: user_id
//             }
//         });
//         return high_scores;
//     }
//     catch (error) {
//         throw error;
//     }
// }
//
// // Function to create a play record
// async function createPasteScrumblePlayRecord(req) {
//     try {
//         const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.create(req);
//         return play_record;
//     } catch (error) {
//         throw error;
//     }
// }
//
// // Function to update a play record
// async function updatePasteScrumblePlayRecord(req) {
//     try {
//         const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.update(req, {
//             where: {
//                 round_id: req.body.round_id
//             }
//         });
//         return play_record;
//     } catch (error) {
//         throw error;
//     }
// }
//
// // Function to delete a play record
// async function deletePasteScrumblePlayRecord(req) {
//     try {
//         const play_record = await KubKaoKabKang_PasteScrumble_PlayRecords.destroy({
//             where: {
//                 round_id: req.body.round_id
//             }
//         });
//         return play_record;
//     } catch (error) {
//         throw error;
//     }
// }


// Exporting functions
module.exports = {

};
