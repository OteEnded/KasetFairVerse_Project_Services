var express = require('express');
var router = express.Router();
const apiMiddleware = require('../services/apimiddleware');
const Cosmetic = require('../models/Cosmetic');

// GET /Cosmetic/HoldYourBasket/get - Get all HoldYourBasket play records
router.get('/HoldYourBasket/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Cosmetic.getAllHoldYourBasketPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all Cosmetic_HoldYourBasket_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Cosmetic_HoldYourBasket_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /Cosmetic/HoldYourBasket/get/user_id/{user_id} - Get Cosmetic_HoldYourBasket_PlayRecords by user_id
router.get('/HoldYourBasket/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Cosmetic.getHoldYourBasketPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Cosmetic_HoldYourBasket_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Cosmetic_HoldYourBasket_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Cosmetic/HoldYourBasket/get/round_id/{round_id} - Get Cosmetic_HoldYourBasket_PlayRecords by round_id
router.get('/HoldYourBasket/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Cosmetic.getHoldYourBasketPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Cosmetic_HoldYourBasket_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Cosmetic_HoldYourBasket_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Cosmetic/HoldYourBasket/get_sum_score/user_id/{user_id} - Get sum of scores by user_id
router.get('/HoldYourBasket/get_sum_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Cosmetic.getSumOfHoldYourBasketScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Sum of Cosmetic_HoldYourBasket_PlayRecords scores with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching sum of Cosmetic_HoldYourBasket_PlayRecords scores with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Cosmetic/HoldYourBasket/get_high_score/user_id/{user_id} - Get high scores by user_id
router.get('/HoldYourBasket/get_high_score/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Cosmetic.getHoldYourBasketHighScoresByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "High scores of Cosmetic_HoldYourBasket_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching high scores of Cosmetic_HoldYourBasket_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /Cosmetic/HoldYourBasket/save - Create a Cosmetic_HoldYourBasket_PlayRecords Create a new user or update an existing Cosmetic_HoldYourBasket_PlayRecords
router.put('/HoldYourBasket/save', apiMiddleware.authenticate, async (req, res) => {
    try {
        // check if round_id is provided
        if (!req.body.round_id) { // round_id is not provided, create new play record
            // check if body is correct
            if (!req.body.user_id) {
                return res.status(400).json({ message: 'user_id is required' });
            }
            if (!req.body.score) {
                return res.status(400).json({ message: 'score is required' });
            }
            const newPlayRecord = await Cosmetic.createHoldYourBasketPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New Cosmetic_HoldYourBasket_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else { // round_id is provided, update play record
            // check if Cosmetic_HoldYourBasket_PlayRecords exists
            const isExist = await Cosmetic.getHoldYourBasketPlayRecordsByRoundId(req.body.round_id);
            // if Cosmetic_HoldYourBasket_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({ message: 'Cosmetic_HoldYourBasket_PlayRecords with round_id: ' + req.body.round_id + ' not exists' });
            }
            // if Cosmetic_HoldYourBasket_PlayRecord exists, update
            const updatedPlayRecord = await Cosmetic.updateHoldYourBasketPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "Cosmetic_HoldYourBasket_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating Cosmetic_HoldYourBasket_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /Cosmetic/HoldYourBasket/delete/{round_id} - Delete a Cosmetic_HoldYourBasket_PlayRecords
router.delete('/HoldYourBasket/delete/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Cosmetic.deleteHoldYourBasketPlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Cosmetic_HoldYourBasket_PlayRecord deleted",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting Cosmetic_HoldYourBasket_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

module.exports = router;