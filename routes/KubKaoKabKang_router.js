var express = require('express');
var router = express.Router();
const KubKaoKabKang = require('../models/KubKaoKabKang');
const apiMiddleware = require('../services/apimiddleware');

// GET /KubKaoKabKang/PasteScrumble/get - Get all users
router.get('/PasteScrumble/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getAllPasteScrumblePlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all KubKaoKabKang_PasteScrumble_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PasteScrumble_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        
        })
    }
});

// GET /KubKaoKabKang/PasteScrumble/get/user_id/{user_id} - Get KubKaoKabKang_PasteScrumble_PlayRecords by user_id
router.get('/PasteScrumble/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getPasteScrumblePlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_PasteScrumble_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PasteScrumble_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /KubKaoKabKang/PasteScrumble/get/round_id/{round_id} - Get KubKaoKabKang_PasteScrumble_PlayRecords by round_id
router.get('/PasteScrumble/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getPasteScrumblePlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_PasteScrumble_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PasteScrumble_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /KubKaoKabKang/PasteScrumble/get_score/user_id/{user_id} - Get sum of scores by user_id
router.get('/PasteScrumble/get_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getSumOfPasteScrumbleScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Sum of KubKaoKabKang_PasteScrumble_PlayRecords scores with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching sum of KubKaoKabKang_PasteScrumble_PlayRecords scores with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /KubKaoKabKang/PasteScrumble/save - Create a KubKaoKabKang_PasteScrumble_PlayRecords Create a new user or update an existing KubKaoKabKang_PasteScrumble_PlayRecords
router.put('/PasteScrumble/save', apiMiddleware.authenticate, async (req, res) => {
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
            const newPlayRecord = await KubKaoKabKang.createPasteScrumblePlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New KubKaoKabKang_PasteScrumble_PlayRecords created",
                status: 200,
                content: newPlayRecord
            });
        }
        else {
            // check if KubKaoKabKang_PasteScrumble_PlayRecords exists
            const isExist = await KubKaoKabKang.getPasteScrumblePlayRecordsByRoundId(req.body.round_id);
            // if KubKaoKabKang_PasteScrumble_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({ message: 'KubKaoKabKang_PasteScrumble_PlayRecords with round_id: ' + req.body.round_id + ' not exists' });
            }
            // if KubKaoKabKang_PlayRecord exists, update        
            const updatedPlayRecord = await KubKaoKabKang.updatePasteScrumblePlayRecord(req.body);
            res.json({
                is_success: true,
                message: "KubKaoKabKang_PasteScrumble_PlayRecords with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating KubKaoKabKang_PasteScrumble_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /KubKaoKabKang/PasteScrumble/delete/{round_id} - Delete a KubKaoKabKang_PasteScrumble_PlayRecords
router.delete('/PasteScrumble/delete/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.deletePasteScrumblePlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_PasteScrumble_PlayRecords deleted",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting KubKaoKabKang_PasteScrumble_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});



module.exports = router;