var User = require('../models/User');
var mongoose = require('mongoose');
var constants = require('../utils/constants')

var now = function () {
    User.createData({
        email: "p32929@yahoo.com",
        name: "Fayaz Bin Salam",
        location: "Anonymous",
        picture: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/efe2c48148029.560b806a17ef7.png",
        phone: "0101010101",
        earning: "99999999",
        free: false,
        status: "admin"
    }, (err, data) => {
        console.log(err || data)
    })
}

var newDb = function () {
    mongoose.connect(constants.mongoUrl, function () {
        mongoose.connection.db.dropDatabase();
    });
}

module.exports = {
    seed: now,
    newDb: newDb
}