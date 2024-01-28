const express = require('express');
const router = express.Router();

// home page route
router.get('/', function(req, res, next) {
    res.render('welcome.html', { title: 'welcome' });
});

// claim reward page route
const claim_reward_controller = require('../controllers/claim_reward_controller')
const claim_coupon_controller = require('../controllers/claim_coupon_controller')

router.get('/claim_reward', claim_reward_controller.claim_reward);
router.get('/claim_coupon', claim_coupon_controller.claim_coupon);







/* TEST ------------------------------------------------------------------------------------ */

// router.get('/claim_reward', function(req, res, next) {
//     res.render('test/bootstrap_test.html', { title: 'claim_reward' });
// });

const testController = require('../controllers/test_controller');

router.get('/test', function(req, res, next) {
    try {
        res.render('test/qr_code_scanner.html');
    }
    catch (error) {
        throw error;
    }
});

router.get('/test2', testController.test2)

router.get('/test3', testController.test3);

router.get('/b', function(req, res, next) {
    res.render('test/bootstrap_test.html', { title: 'welcome' });
});
module.exports = router;
