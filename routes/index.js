var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('welcome.html', { title: 'welcome' });
});

router.get('/claim_reward', function(req, res, next) {
    res.render('claim_reward.html', { title: 'claim_reward' });
});

module.exports = router;
