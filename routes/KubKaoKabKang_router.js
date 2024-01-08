var express = require('express');
var router = express.Router();
const KubKaoKabKang = require('../models/KubKaoKabKang');
const apiMiddleware = require('../services/apimiddleware');

// GET /KubKaoKabKang/PasteScrumble/get - Get all PasteScrumble play records
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

// GET /KubKaoKabKang/PasteScrumble/get_sum_score/user_id/{user_id} - Get sum of scores by user_id
router.get('/PasteScrumble/get_sum_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
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

// GET /KubKaoKabKang/PasteScrumble/get_high_score/user_id/{user_id} - Get high scores by user_id
router.get('/PasteScrumble/get_high_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getPasteScrumbleHighScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "High scores of KubKaoKabKang_PasteScrumble_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching high scores of KubKaoKabKang_PasteScrumble_PlayRecords with user_id: " + req.params.user_id,
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
            message: "Error creating or updating KubKaoKabKang_PasteScrumble_PlayRecord",
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
            message: "KubKaoKabKang_PasteScrumble_PlayRecord deleted",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting KubKaoKabKang_PasteScrumble_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /KubKaoKabKang/CWheat/get - Get all CWheat play records
router.get('/CWheat/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getAllCWheatPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all KubKaoKabKang_CWheat_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_CWheat_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /KubKaoKabKang/CWheat/get/user_id/{user_id} - Get KubKaoKabKang_CWheat_PlayRecords by user_id
router.get('/CWheat/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getCWheatPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_CWheat_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_CWheat_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /KubKaoKabKang/CWheat/get/round_id/{round_id} - Get KubKaoKabKang_CWheat_PlayRecords by round_id
router.get('/CWheat/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getCWheatPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_CWheat_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_CWheat_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /KubKaoKabKang/CWheat/get_sum_score/user_id/{user_id} - Get sum of scores by user_id
router.get('/CWheat/get_sum_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getSumOfCWheatScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Sum of KubKaoKabKang_CWheat_PlayRecords scores with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching sum of KubKaoKabKang_CWheat_PlayRecords scores with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /KubKaoKabKang/CWheat/get_high_score/user_id/{user_id} - Get high scores by user_id
router.get('/CWheat/get_high_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.getCWheatHighScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "High scores of KubKaoKabKang_CWheat_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching high scores of KubKaoKabKang_CWheat_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /KubKaoKabKang/CWheat/save - Create a KubKaoKabKang_CWheat_PlayRecords Create a new user or update an existing KubKaoKabKang_CWheat_PlayRecords
router.put('/CWheat/save', apiMiddleware.authenticate, async (req, res) => {
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
            const newPlayRecord = await KubKaoKabKang.createCWheatPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New KubKaoKabKang_CWheat_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else {
            // check if KubKaoKabKang_CWheat_PlayRecords exists
            const isExist = await KubKaoKabKang.getCWheatPlayRecordsByRoundId(req.body.round_id);
            // if KubKaoKabKang_CWheat_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({ message: 'KubKaoKabKang_CWheat_PlayRecords with round_id: ' + req.body.round_id + ' not exists' });
            }
            // if KubKaoKabKang_PlayRecord exists, update
            const updatedPlayRecord = await KubKaoKabKang.updateCWheatPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "KubKaoKabKang_CWheat_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating KubKaoKabKang_CWheat_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /KubKaoKabKang/CWheat/delete/{round_id} - Delete a KubKaoKabKang_CWheat_PlayRecords
router.delete('/CWheat/delete/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await KubKaoKabKang.deleteCWheatPlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "KubKaoKabKang_CWheat_PlayRecord deleted",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting KubKaoKabKang_CWheat_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

module.exports = router;