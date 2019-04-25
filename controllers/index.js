
var express = require('express'),
    router = express.Router();

router.use('/users', require('./users'));

router.get('/', function (req, res) {
    res.render('index', {title: 'I am free'});
});

module.exports = router;
