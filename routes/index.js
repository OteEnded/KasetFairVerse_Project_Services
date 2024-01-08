var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.json({
  //           is_success: true,
  //           message: "Welcome to KubKaoKabKang API",
  //           status: 200,
  //           content: {
  //               message: "Welcome to KubKaoKabKang API"
  //           }
  //       });
  res.render('welcome.html', { title: 'welcome' });
});

router.get('/claim_reward', function(req, res, next) {
  // res.json({
  //           is_success: true,
  //           message: "Welcome to KubKaoKabKang API",
  //           status: 200,
  //           content: {
  //               message: "Welcome to KubKaoKabKang API"
  //           }
  //       });
  res.render('claim_reward.html', { title: 'claim_reward' });
});


// router.get('/html', function(req, res, next) {
//   // res.json({
//   //           is_success: true,
//   //           message: "Welcome to KubKaoKabKang API",
//   //           status: 200,
//   //           content: {
//   //               message: "Welcome to KubKaoKabKang API"
//   //           }
//   //       });
//   res.render('welcome.html');
// });

module.exports = router;
