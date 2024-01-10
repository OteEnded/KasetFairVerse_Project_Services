var express = require('express');
var router = express.Router();
const apiMiddleware = require('../services/apimiddleware');
const Accessories = require('../models/Accessories');

// GET /Accessories/ColorMatching/get - Get all ColorMatching play records
router.get('/ColorMatching/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Accessories.getAllColorMatchingPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all Accessories_ColorMatching_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Accessories_ColorMatching_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /Accessories/ColorMatching/get/user_id/{user_id} - Get Accessories_ColorMatching_PlayRecords by user_id
router.get('/ColorMatching/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Accessories.getColorMatchingPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Accessories_ColorMatching_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Accessories_ColorMatching_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }

});

// GET /Accessories/ColorMatching/get/round_id/{round_id} - Get Accessories_ColorMatching_PlayRecords by round_id
router.get('/ColorMatching/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Accessories.getColorMatchingPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Accessories_ColorMatching_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Accessories_ColorMatching_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Accessories/ColorMatching/get_find/{column}/{value} - Get Accessories_ColorMatching_PlayRecords by column and value
router.get('/ColorMatching/get_find/:column/:value', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Accessories.findColorMatchingPlayRecords(req.params.column, req.params.value);
        console.log(result);
        res.json({
            is_success: true,
            message: "Accessories_ColorMatching_PlayRecords with " + req.params.column + ": " + req.params.value,
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Accessories_ColorMatching_PlayRecords with " + req.params.column + ": " + req.params.value,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /Accessories/ColorMatching/save - Create a Accessories_ColorMatching_PlayRecords Create a new user or update an existing Accessories_ColorMatching_PlayRecords
router.put('/ColorMatching/save', apiMiddleware.authenticate, async (req, res) => {
    try {
        // check if round_id is provided
        if (!req.body.round_id) { // round_id is not provided, create new play record
            // check if body is correct
            if (!req.body.user_id) {
                return res.status(400).json({
                    is_success: false,
                    message: 'user_id is required',
                    status: 400,
                    content: null
                });
            }
            if (!req.body.is_win) {
                return res.status(400).json({
                    is_success: false,
                    message: 'is_win is required',
                    status: 400,
                    content: null
                });
            }
            const newPlayRecord = await Accessories.createColorMatchingPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New Accessories_ColorMatching_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else { // round_id is provided, update play record
            // check if Accessories_ColorMatching_PlayRecords exists
            const isExist = await Accessories.getColorMatchingPlayRecordsByRoundId(req.body.round_id);
            // if Accessories_ColorMatching_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({
                    is_success: false,
                    message: 'Accessories_ColorMatching_PlayRecords with round_id: ' + req.body.round_id + ' not exists',
                    status: 400,
                    content: null
                });
            }
            // if Accessories_ColorMatching_PlayRecord exists, update
            const updatedPlayRecord = await Accessories.updateColorMatchingPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "Accessories_ColorMatching_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating Accessories_ColorMatching_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /Accessories/ColorMatching/delete/{round_id} - Delete a Accessories_ColorMatching_PlayRecords
router.delete('/ColorMatching/delete/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Accessories.deleteColorMatchingPlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Tried to delete Accessories_ColorMatching_PlayRecord",
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting Accessories_ColorMatching_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

module.exports = router;