/**
 * Bluebird promise for mongoose promise operations
 */
const Promise = require("bluebird");
const mongoose = require("mongoose");
Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;

module.exports = mongoose;