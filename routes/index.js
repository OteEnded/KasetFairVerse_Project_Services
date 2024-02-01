const express = require('express');
const router = express.Router();

// home page route
router.get('/', function(req, res, next) {
    res.redirect('/reward');
});

router.get('/path_finder', function(req, res, next) {
    res.render('path_finder', {});
});

router.get('/api', function(req, res, next) {
    res.render('welcome-api', {});
});

// claim reward page route
const staff_pages_controller = require('../controllers/staff_pages_controller')
const user_pages_controller = require('../controllers/user_pages_controller')

router.get('/claim_reward', staff_pages_controller.claim_reward);
router.get('/coupon_validation', staff_pages_controller.coupon_validation);

router.get('/reward', user_pages_controller.reward);
router.get('/trade_coupon', user_pages_controller.trade_coupon);
router.post('/trade_coupon', user_pages_controller.trade_coupon_submit_select_star);
router.post('/my_coupon', user_pages_controller.trade_coupon_submit_select_reward);
router.get('/my_coupon', user_pages_controller.my_coupon);
router.get('/login', user_pages_controller.login);
router.post('/login', user_pages_controller.login_submit);







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
