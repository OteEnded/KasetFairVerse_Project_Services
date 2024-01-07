var express = require('express');
var router = express.Router();
const apiMiddleware = require('../services/apimiddleware');

// GET /Cosmetic/HoldYourBucket/get_highscore/user_id/:user_id - Get all users
router.get('/HoldYourBucket/get_highscore/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {

        console.log(result);
        res.json({
            is_success: true,
            message: "List of all KubKaoKabKang_PasteScrumble_PlayRecords",
            status: 200,
            content: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error fetching KubKaoKabKang_PasteScrumble_PlayRecords",
            status: 500,
            content: error.message

        })
    }
});

module.exports = router;