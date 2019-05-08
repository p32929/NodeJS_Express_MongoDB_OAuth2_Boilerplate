
var express = require('express'),
    router = express.Router();

router.use('/users', require('./users'));

router.get('/', function (req, res) {
    res.render('index', {title: 'Boilerplate'});
});

router.get('*', function (req, res) {
    res.status(404).render('error', {
        title: 'Boilerplate', error: {
            status: 404,
            stack: 'Not found'
        }
    });
});

module.exports = router;
