const express = require('express');
const router = express.Router();
const apiMiddleware = require('../services/apimiddleware');
const dbmigrateandseed = require('../services/dbmigrateandseed');

const star = require('../models/Star');
const user = require('../models/User')

// GET /Api/Admin/migrate
router.post('/migrate', apiMiddleware.authenticate, async (req, res) => {
    try {
        await dbmigrateandseed.migrate();
        res.json({
            is_success: true,
            message: "Migrate",
            status: 200,
            content: {
                message: "Migrate function invoked"
            }
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /Api/Admin/seed
router.post('/seed', apiMiddleware.authenticate, async (req, res) => {
    try {
        await dbmigrateandseed.seed();
        res.json({
            is_success: true,
            message: "Seed",
            status: 200,
            content: {
                message: "Seed function invoked"
            }
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// POST /Api/Admin/starUp/user_id/:user_id
router.post('/star_up/user_id/:user_id/which_game/:which_game', apiMiddleware.authenticate, async (req, res) => {
    try {
        await star.starUp(parseInt(req.params.user_id), "Hemp/TheDrink");
        res.json({
            message: "done"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

module.exports = router;