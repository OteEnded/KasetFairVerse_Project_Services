const express = require('express');
const router = express.Router();

// home page route
router.get('/', function(req, res, next) {
    res.render('welcome.html', { title: 'welcome' });
});

// claim reward page route
const staff_controller = require('../controllers/staff_controller')
const user_controller = require('../controllers/user_controller')

router.get('/claim_reward', staff_controller.claim_reward);
router.get('/coupon_validation', staff_controller.coupon_validation);
router.get('/reward', user_controller.reward);
router.get('/trade_coupon', user_controller.trade_coupon);
router.post('/trade_coupon', user_controller.trade_coupon_find_matching_reward);
router.get('/my_coupon', user_controller.my_coupon);








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

router.get('/bs_test', function(req, res, next) {
    res.render('test/bootstrap_test.html', { title: 'welcome' });
});

router.get('/tw_test', function(req, res, next) {
    res.render('test/tailwind_test.html', {title: 'welcome'});
});

router.get('/t', function(req, res, next) {
    res.render('test/t.html', { a: [1,2,3]});
});
module.exports = router;
