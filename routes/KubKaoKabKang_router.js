var express = require('express');
var router = express.Router();
const KubKaoKabKang = require('../models/KubKaoKabKang');
const apiMiddleware = require('../services/apimiddleware');

// GET /KubKaoKabKang/get - Get all users
router.get('/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getAllPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all KubKaoKabKang_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PlayRecords",
            status: 500,
            content: error.message
        
        })
    }
});

// GET /KubKaoKabKang/get/user_id/{user_id} - Get KubKaoKabKang_PlayRecords by user_id
router.get('/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: error.message
        });
    }
});

// GET /KubKaoKabKang/get/round_id/{round_id} - Get KubKaoKabKang_PlayRecords by round_id
router.get('/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: error.message
        });
    }
});

// GET /KubKaoKabKang/get/score/{user_id} - Get sum of scores by user_id
router.get('/get/score/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getSumOfScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Sum of scores with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching sum of scores with user_id: " + req.params.user_id,
            status: 500,
            content: error.message
        });
    }
});

// // PUT /users/save - Create a new user or update an existing user
// router.put('/save', async (req, res) => {
//     try {

//         // check if user_id is provided
//         if (!req.body.user_id){
//             // check if body is correct
//             if (!req.body.user_name) {
//                 return res.status(400).json({ message: 'user_name is required' });
//             }   
//             // if (!req.body.user_email) {
//             //     return res.status(400).json({ message: 'user_email is required' });
//             // }
//             const newUser = await user.createUser(req.body);
//             res.json({
//                 is_success: true,
//                 message: "New user created",
//                 status: 200,
//                 content: newUser
//             });
//         }
//         else {
//             // check if user exists
//             const isExist = await user.getUser(req.body.user_id);
//             // if user not exists, return error
//             if (!isExist) {
//                 return res.status(400).json({ message: 'user with user_id: ' + req.body.user_id + ' not exists' });
//             }
//             // if user exists, update        
//             const updatedUser = await user.updateUser(req.body);
//             res.json({
//                 is_success: true,
//                 message: "User with user_id: " + req.body.user_id + " updated",
//                 status: 200,
//                 content: updatedUser
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             is_success: false,
//             message: "Error creating or updating user",
//             status: 500,
//             content: error.message
//         });
//     }
// }); 

// PUT /KubKaoKabKang/save - Create a KubKaoKabKang_PlayRecord Create a new user or update an existing KubKaoKabKang_PlayRecord
router.put('/save', apiMiddleware.authenticate, async (req, res) => {
    try {
        // check if round_id is provided
        if (!req.body.round_id) {
            // check if body is correct
            if (!req.body.user_id) {
                return res.status(400).json({ message: 'user_id is required' });
            }
            if (!req.body.score) {
                return res.status(400).json({ message: 'score is required' });
            }
            const newPlayRecord = await KubKaoKabKang.createPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New KubKaoKabKang_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else {
            // check if KubKaoKabKang_PlayRecord exists
            const isExist = await KubKaoKabKang.getPlayRecordsByRoundId(req.body.round_id);
            // if KubKaoKabKang_PlayRecord not exists, return error
            if (!isExist) {
                return res.status(400).json({ message: 'KubKaoKabKang_PlayRecord with round_id: ' + req.body.round_id + ' not exists' });
            }
            // if KubKaoKabKang_PlayRecord exists, update        
            const updatedPlayRecord = await KubKaoKabKang.updatePlayRecord(req.body);
            res.json({
                is_success: true,
                message: "KubKaoKabKang_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating KubKaoKabKang_PlayRecord",
            status: 500,
            content: error.message
        });
    }
});

// DELETE /KubKaoKabKang/delete/{round_id} - Delete a KubKaoKabKang_PlayRecords
router.delete('/delete/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.deletePlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_PlayRecord deleted",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting KubKaoKabKang_PlayRecord",
            status: 500,
            content: error.message
        });
    }
});

module.exports = router;