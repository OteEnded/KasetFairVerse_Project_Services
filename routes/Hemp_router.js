var express = require('express');
var router = express.Router();
const apiMiddleware = require('../services/apimiddleware');
const Hemp = require('../models/Hemp');

// GET /Hemp/TheDrink/get - Get all Hemp TheDrink play records
router.get('/TheDrink/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.getAllTheDrinkPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all Hemp_TheDrink_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Hemp_TheDrink_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /Hemp/TheDrink/get/user_id/{user_id} - Get Hemp_TheDrink_PlayRecords by user_id
router.get('/TheDrink/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.getTheDrinkPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Hemp_TheDrink_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Hemp_TheDrink_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Hemp/TheDrink/get/round_id/{round_id} - Get Hemp_TheDrink_PlayRecords by round_id
router.get('/TheDrink/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.getTheDrinkPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Hemp_TheDrink_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching Hemp_TheDrink_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Hemp/TheDrink/number_of_ending/user_id/{user_id} - Get how many different TheDrink endings a user has played
router.get('/TheDrink/number_of_ending/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.getNumberOfDifferentTheDrinkEndingsPlayed(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Number of different Hemp_TheDrink endings played by user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error getting number of different Hemp_TheDrink endings played by user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Hemp/TheDrink/progress/user_id/{user_id} - Get Hemp TheDrink progress a user has played
router.get('/TheDrink/progress/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.getTheDrinkProgressByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Hemp TheDrink progress played by user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error getting Hemp TheDrink progress played by user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Hemp/TheDrink/get_find/{column}/{value} - Find Hemp_TheDrink_PlayRecords
router.get('/TheDrink/get_find/:column/:value', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.findTheDrinkPlayRecords(req.params.column, req.params.value);
        console.log(result);
        res.json({
            is_success: true,
            message: "Hemp_TheDrink_PlayRecords with " + req.params.column + ": " + req.params.value,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error finding Hemp_TheDrink_PlayRecords with " + req.params.column + ": " + req.params.value,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /Hemp/TheDrink/save - Create a Hemp_TheDrink_PlayRecords Create a new user or update an existing Hemp_TheDrink_PlayRecords
router.put('/TheDrink/save', apiMiddleware.authenticate, async (req, res) => {
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
            if (!req.body.ending) {
                return res.status(400).json({
                    is_success: false,
                    message: 'ending is required',
                    status: 400,
                    content: null
                });
            }
            const newPlayRecord = await Hemp.createTheDrinkPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New Hemp_TheDrink_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else { // round_id is provided, update play record
            // check if Hemp_TheDrink_PlayRecords exists
            const isExist = await Hemp.getTheDrinkPlayRecordsByRoundId(req.body.round_id);
            // if Hemp_TheDrink_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({
                    is_success: false,
                    message: 'Hemp_TheDrink_PlayRecords with round_id: ' + req.body.round_id + ' not exists',
                    status: 400,
                    content: null
                });
            }
            // if Hemp_TheDrink_PlayRecord exists, update
            const updatedPlayRecord = await Hemp.updateTheDrinkPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "Hemp_TheDrink_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating Hemp_TheDrink_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /Hemp/TheDrink/delete/{round_id} - Delete a Hemp_TheDrink_PlayRecords
router.delete('/TheDrink/delete/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await Hemp.deleteTheDrinkPlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Tried to delete Hemp_TheDrink_PlayRecord",
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting Hemp_TheDrink_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

module.exports = router;