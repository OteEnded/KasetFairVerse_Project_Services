var express = require('express');
var router = express.Router();
const user = require('../models/User');
const apiMiddleware = require('../services/apimiddleware');

// GET /Users/get - Get all users
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

// GET /Users/get/user_id/{user_id} - Get users by user_id
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

// GET /Users/get/user_name/{user_name} - Get users by user_name
router.get('/get/user_name/:user_name', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await user.getUsersByUserName(req.params.user_name);
        res.json({
            is_success: true,
            message: "User with user_name: " + req.params.user_name,
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching user with user_name: " + req.params.user_name,
            status: 500,
            content: error.message
        });
    }
});

// // GET /Users/get/user_email/{user_email} - Get users by user_email
// router.get('/get/user_email/:user_email', apiMiddleware.authenticate, async (req, res) => {
//     try {
//         const result = await user.getUsersByUserEmail(req.params.user_email);
//         res.json({
//             is_success: true,
//             message: "User with user_email: " + req.params.user_email,
//             status: 200,
//             content: result
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             is_success: false,
//             message: "Error fetching user with user_email: " + req.params.user_email,
//             status: 500,
//             content: error.message
//         });
//     }
// });


// PUT /Users/save - Create a new user or update an existing user
router.put('/save', apiMiddleware.authenticate, async (req, res) => {
    try {

        // check if user_id is provided
        if (!req.body.user_id){
            // check if body is correct
            if (!req.body.user_name) {
                return res.status(400).json({ message: 'user_name is required' });
            }
            const newUser = await user.createUser(req.body);
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
                return res.status(400).json({ message: 'user with user_id: ' + req.body.user_id + ' not exists' });
            }
            // if user exists, update        
            const updatedUser = await user.updateUser(req.body);
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

// DELETE /Users/delete/{user_id} - Delete users by user_id
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


// GET /Users/get_bbt_user - Get users from BBT by token
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