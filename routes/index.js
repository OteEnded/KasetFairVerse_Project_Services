var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
            is_success: true,
            message: "Welcome to KubKaoKabKang API",
            status: 200,
            content: {
                message: "Welcome to KubKaoKabKang API"
            }
        });
  res.render('welcome', { title: 'Express' });
});

module.exports = router;
