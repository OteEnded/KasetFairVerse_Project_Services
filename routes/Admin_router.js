var express = require('express');
var router = express.Router();
const user = require('../models/User');
const apiMiddleware = require('../services/apimiddleware');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();
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

// GET /Admin/testget1
router.get('/test1', apiMiddleware.authenticate, async (req, res) => {
    try {
        res.json({
            is_success: true,
            message: "testget1",
            status: 200,
            content: req.method
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        
        })
    }
});

// POST /Admin/testpost1
router.post('/test1', apiMiddleware.authenticate, async (req, res) => {
    try {
        res.json({
            is_success: true,
            message: "testpost1",
            status: 200,
            content: req.method
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        
        })
    }
});

// PUT /Admin/testput1
router.put('/test1', apiMiddleware.authenticate, async (req, res) => {
    try {
        res.json({
            is_success: true,
            message: "testput1",
            status: 200,
            content: req.method
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        
        })
    }
});

// DELETE /Admin/testdelete1
router.delete('/test1', apiMiddleware.authenticate, async (req, res) => {
    try {
        res.json({
            is_success: true,
            message: "testdelete1",
            status: 200,
            content: req.method
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        })
    }
});

// GET /Admin/testget2

module.exports = router;