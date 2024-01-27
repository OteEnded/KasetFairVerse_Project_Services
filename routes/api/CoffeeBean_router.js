var express = require('express');
var router = express.Router();
const apiMiddleware = require('../../services/apimiddleware');
const CoffeeBean = require('../../models/CoffeeBean');

// GET /api/CoffeeBean/FindMyMeow/get - Get all FindMyMeow play records
router.get('/FindMyMeow/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CoffeeBean.getAllFindMyMeowPlayRecords();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all CoffeeBean_FindMyMeow_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CoffeeBean_FindMyMeow_PlayRecords",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /api/CoffeeBean/FindMyMeow/get/user_id/{user_id} - Get CoffeeBean_FindMyMeow_PlayRecords by user_id
router.get('/FindMyMeow/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CoffeeBean.getFindMyMeowPlayRecordsByUserId(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "CoffeeBean_FindMyMeow_PlayRecords with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CoffeeBean_FindMyMeow_PlayRecords with user_id: " + req.params.user_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /api/CoffeeBean/FindMyMeow/get/round_id/{round_id} - Get CoffeeBean_FindMyMeow_PlayRecords by round_id
router.get('/FindMyMeow/get/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CoffeeBean.getFindMyMeowPlayRecordsByRoundId(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "CoffeeBean_FindMyMeow_PlayRecords with round_id: " + req.params.round_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching CoffeeBean_FindMyMeow_PlayRecords with round_id: " + req.params.round_id,
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// PUT /api/CoffeeBean/FindMyMeow/save - Create a CoffeeBean_FindMyMeow_PlayRecords Create a new user or update an existing CoffeeBean_FindMyMeow_PlayRecords
router.put('/FindMyMeow/save', apiMiddleware.authenticate, async (req, res) => {
    try {
        // check if round_id is provided
        if (!Object.keys(req.body).includes("round_id")) { // round_id is not provided, create new play record
            // check if body is correct
            if (!Object.keys(req.body).includes("user_id")) {
                return res.status(400).json({ message: 'user_id is required' });
            }
            if (!Object.keys(req.body).includes("normal_cat")) {
                return res.status(400).json({ message: 'normal_cat is required' });
            }
            // if (!Object.keys(req.body).includes("golden_cat")) {
            //     return res.status(400).json({ message: 'golden_cat is required' });
            // }
            const newPlayRecord = await CoffeeBean.createFindMyMeowPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "New CoffeeBean_FindMyMeow_PlayRecord created",
                status: 200,
                content: newPlayRecord
            });
        }
        else { // round_id is provided, update play record
            // check if CoffeeBean_FindMyMeow_PlayRecords exists
            const isExist = await CoffeeBean.getFindMyMeowPlayRecordsByRoundId(req.body.round_id);
            // if CoffeeBean_FindMyMeow_PlayRecords not exists, return error
            if (!isExist) {
                return res.status(400).json({
                    is_success: false,
                    message: 'CoffeeBean_FindMyMeow_PlayRecords with round_id: ' + req.body.round_id + ' not exists',
                    status: 400,
                    content: null
                });
            }
            // if CoffeeBean_FindMyMeow_PlayRecord exists, update
            const updatedPlayRecord = await CoffeeBean.updateFindMyMeowPlayRecord(req.body);
            res.json({
                is_success: true,
                message: "CoffeeBean_FindMyMeow_PlayRecord with round_id: " + req.body.round_id + " updated",
                status: 200,
                content: updatedPlayRecord
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating CoffeeBean_FindMyMeow_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// DELETE /api/CoffeeBean/FindMyMeow/delete/round_id/{round_id} - Delete a CoffeeBean_FindMyMeow_PlayRecords
router.delete('/FindMyMeow/delete/round_id/:round_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await CoffeeBean.deleteFindMyMeowPlayRecord(req.params.round_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "Tried to delete CoffeeBean_FindMyMeow_PlayRecord",
            status: 200,
            content: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting CoffeeBean_FindMyMeow_PlayRecord",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});


module.exports = router;