var express = require('express');
var router = express.Router();
const apiMiddleware = require('../services/apimiddleware');
const CornMilk = require('../models/CornMilk');

// GET /Api/CornMilk/RaisuwanCrush/get - Get all RaisuwanCrush play records
router.get('/RaisuwanCrush/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.getAllRaisuwanCrushPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all CornMilk_RaisuwanCrush_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CornMilk_RaisuwanCrush_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /Api/CornMilk/RaisuwanCrush/get/user_id/{user_id} - Get CornMilk_RaisuwanCrush_PlayRecords by user_id
router.get('/RaisuwanCrush/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.getRaisuwanCrushPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "CornMilk_RaisuwanCrush_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CornMilk_RaisuwanCrush_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Api/CornMilk/RaisuwanCrush/get/round_id/{round_id} - Get CornMilk_RaisuwanCrush_PlayRecords by round_id
router.get('/RaisuwanCrush/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.getRaisuwanCrushPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "CornMilk_RaisuwanCrush_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CornMilk_RaisuwanCrush_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Api/CornMilk/RaisuwanCrush/get_sum_score/user_id/{user_id} - Get sum of scores by user_id
router.get('/RaisuwanCrush/get_sum_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.getSumOfRaisuwanCrushScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Sum of CornMilk_RaisuwanCrush_PlayRecords scores with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching sum of CornMilk_RaisuwanCrush_PlayRecords scores with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Api/CornMilk/RaisuwanCrush/get_high_score/user_id/{user_id} - Get high scores by user_id
router.get('/RaisuwanCrush/get_high_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.getRaisuwanCrushHighScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "High scores of CornMilk_RaisuwanCrush_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching high scores of CornMilk_RaisuwanCrush_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Api/CornMilk/RaisuwanCrush/get_highest_score - Get the highest score record of CornMilk_RaisuwanCrush_PlayRecords
router.get('/RaisuwanCrush/get_highest_score', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.getRaisuwanCrushHighestScoresRecord();
        console.log(result);
        res.json({
            is_success: true,
            message: "Highest score record of CornMilk_RaisuwanCrush_PlayRecords",
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching highest score of CornMilk_RaisuwanCrush_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Api/CornMilk/RaisuwanCrush/get_find/{column}/{value} - Get CornMilk_RaisuwanCrush_PlayRecords by column and value
router.get('/RaisuwanCrush/get_find/:column/:value', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.findRaisuwanCrushPlayRecords(req.params.column, req.params.value);
        console.log(result);
        res.json({
            is_success: true,
            message: "CornMilk_RaisuwanCrush_PlayRecords with " + req.params.column + ": " + req.params.value,
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CornMilk_RaisuwanCrush_PlayRecords with " + req.params.column + ": " + req.params.value,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /Api/CornMilk/RaisuwanCrush/save - Create a CornMilk_RaisuwanCrush_PlayRecords Create a new user or update an existing CornMilk_RaisuwanCrush_PlayRecords
router.put('/RaisuwanCrush/save', apiMiddleware.authenticate, async (req, res) => {
    try {
        // check if round_id is provided
        if (!Object.keys(req.body).includes("round_id")) { // round_id is not provided, create new play record
            // check if body is correct
            if (!Object.keys(req.body).includes("user_id")) {
                return res.status(400).json({ message: 'user_id is required' });
            }
            if (!Object.keys(req.body).includes("score")) {
                return res.status(400).json({ message: 'score is required' });
            }
            const newPlayRecord = await CornMilk.createRaisuwanCrushPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New CornMilk_RaisuwanCrush_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else { // round_id is provided, update play record
            // check if CornMilk_RaisuwanCrush_PlayRecords exists
            const isExist = await CornMilk.getRaisuwanCrushPlayRecordsByRoundId(req.body.round_id);
            // if CornMilk_RaisuwanCrush_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({
                    is_success: false,
                    message: 'CornMilk_RaisuwanCrush_PlayRecords with round_id: ' + req.body.round_id + ' not exists',
                    status: 400,
                    content: null
                });
            }
            // if CornMilk_RaisuwanCrush_PlayRecord exists, update
            const updatedPlayRecord = await CornMilk.updateRaisuwanCrushPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "CornMilk_RaisuwanCrush_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating CornMilk_RaisuwanCrush_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /Api/CornMilk/RaisuwanCrush/delete/round_id/{round_id} - Delete a CornMilk_RaisuwanCrush_PlayRecords
router.delete('/RaisuwanCrush/delete/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CornMilk.deleteRaisuwanCrushPlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Tried to delete CornMilk_RaisuwanCrush_PlayRecord",
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting CornMilk_RaisuwanCrush_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});


module.exports = router;