var express = require('express');
var router = express.Router();
const user = require('../models/User');
const apiMiddleware = require('../services/apimiddleware');

// GET /api/Users/get - Get all users
router.get('/get', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await user.getAllUsers();
        console.log(result);
        res.json({
            is_success: true,
            message: "List of all users",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching users",
            status: 500,
            content: error.message
        
        })
    }
});

// GET /api/Users/get/user_id/{user_id} - Get users by user_id
router.get('/get/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await user.getUser(req.params.user_id);
        console.log(result);
        res.json({
            is_success: true,
            message: "User with user_id: " + req.params.user_id,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching user with user_id: " + req.params.user_id,
            status: 500,
            content: error.message
        });
    }
});

// GET /api/Users/get/username/{username} - Get users by username
router.get('/get/username/:username', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await user.getUsersByUserName(req.params.username);
        res.json({
            is_success: true,
            message: "User with username: " + req.params.username,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching user with username: " + req.params.username,
            status: 500,
            content: error.message
        });
    }
});

// PUT /api/Users/save - Create a new user or update an existing user
router.put('/save', apiMiddleware.authenticate, async (req, res) => {
    try {

        // check if user_id is provided
        if (!req.body.user_id){
            // check if body is correct
            if (!req.body.username) {
                return res.status(400).json({
                    is_success: false,
                    message: 'username is required',
                    status: 400,
                    content: null
                });
            }
            const createReq = {};
            for (let i in req.body){
                if (["username"].includes(i)) createReq[i] = req.body[i];
            }
            const newUser = await user.createUser(createReq);
            res.json({
                is_success: true,
                message: "New user created",
                status: 200,
                content: newUser
            });
        }
        else {
            // check if user exists
            const isExist = await user.getUser(req.body.user_id);
            // if user not exists, return error
            if (!isExist) {
                return res.status(400).json({
                    is_success: false,
                    message: 'user with user_id: ' + req.body.user_id + ' not exists',
                    status: 400,
                    content: null
                });
            }
            // if user exists, update
            const updateReq = {};
            for (let i in req.body){
                if (["user_id", "username"].includes(i)) updateReq[i] = req.body[i];
            }
            const updatedUser = await user.updateUser(updateReq);
            res.json({
                is_success: true,
                message: "User with user_id: " + req.body.user_id + " updated",
                status: 200,
                content: updatedUser
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error creating or updating user",
            status: 500,
            content: error.message
        });
    }
}); 

// DELETE /api/Users/delete/{user_id} - Delete users by user_id
router.delete('/delete/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await user.deleteUser(req.params.user_id);
        res.json({
            is_success: true,
            message: "User with user_id: " + req.params.user_id + " deleted",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error deleting user with user_id: " + req.params.user_id,
            status: 500,
            content: error.message
        });
    }
});


// GET /api/Users/get_bbt_user - Get users from BBT by token
router.get('/get_bbt_user/token/:token', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await user.getUserFromBigBangTheory(req.params.token);
        // const result = await user.getUserFromBigBangTheory(req.body.token);
        console.log(result);
        res.json({
            is_success: true,
            message: "User with token: " + req.params.token,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching user with token: " + req.params.token,
            status: 500,
            content: error.message
        });
    }
});

module.exports = router;