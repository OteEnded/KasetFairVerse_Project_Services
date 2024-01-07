var express = require('express');
var router = express.Router();
const apiMiddleware = require('../services/apimiddleware');
const dbmigrateandseed = require('../services/dbmigrateandseed');

// GET /Admin/migrate
router.get('/migrate', apiMiddleware.authenticate, async (req, res) => {
    try {
        dbmigrateandseed.migrate();
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

// GET /Admin/seed
router.get('/seed', apiMiddleware.authenticate, async (req, res) => {
    try {
        dbmigrateandseed.seed();
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

module.exports = router;