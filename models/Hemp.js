// const Hemp_TheDrink_PlayRecords = require('../entities/Hemp_TheDrink_PlayRecords');
//
// // Function to get all Hemp play records
// async function getAllHempPlayRecords() {
//     try {
//         const all_play_records = await Hemp_TheDrink_PlayRecords.findAll();
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
// // Function to get Hemp play records by user_id
// async function getHempPlayRecordsByUserId(user_id) {
//     try {
//         const play_record = await Hemp_TheDrink_PlayRecords.findAll({
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
// // Function to get Hemp play record by round_id
// async function getHempPlayRecordsByRoundId(round_id) {
//     try {
//         const play_record = await Hemp_TheDrink_PlayRecords.findOne({
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
// // Function to get sum of Hemp scores by user_id
// async function getSumOfHempScoresByUserId(user_id) {
//     try {
//         const sum_of_scores = await Hemp_TheDrink_PlayRecords.sum('score', {
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
// // Function to get Hemp high scores of a user by user_id
// async function getHempHighScoresByUserId(user_id) {
//     try {
//         const high_scores = await Hemp_TheDrink_PlayRecords.max('score', {
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
// // Function to find Hemp play records
// async function findHempPlayRecords(column, value) {
//     try {
//         const play_records = await Hemp_TheDrink_PlayRecords.findAll({
//             where: {
//                 [column]: value
//             }
//         });
//         return play_records;
//     } catch (error) {
//         throw error;
//     }
// }
//
// // Function to create a Hemp play record
// async function createHempPlayRecord(req) {
//     try {
//         const play_record = await Hemp_TheDrink_PlayRecords.create(req);
//         return play_record;
//     } catch (error) {
//         throw error;
//     }
// }
//
// // Function to update a Hemp play record
// async function updateHempPlayRecord(req) {
//     try {
//         const play_record = await Hemp_TheDrink_PlayRecords.update(req, {
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
// // Function to delete a Hemp play record
// async function deleteHempPlayRecord(round_id) {
//     try {
//         const play_record = await Hemp_TheDrink_PlayRecords.findOne({
//             where: {
//                 round_id: round_id
//             }
//         });
//         if (!play_record){
//             return "Cannot delete play record wtih round_id: " + round_id + " because it does not exist.";
//         }
//         await Hemp_TheDrink_PlayRecords.destroy({
//             where: {
//                 round_id: round_id
//             }
//         });
//         return play_record;
//     } catch (error) {
//         throw error;
//     }
// }
//
// // Exporting functions
// module.exports = {
//
// };
