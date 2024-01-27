const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('welcome.html', { title: 'welcome' });
});

router.get('/claim_reward', function(req, res, next) {
    res.render('claim_reward.html', { title: 'claim_reward' });
});

router.get('/test', function(req, res, next) {
    try {
        res.render('qr_code_scanner.html');
    }
    catch (error) {
        throw error;
    }
});


module.exports = router;
