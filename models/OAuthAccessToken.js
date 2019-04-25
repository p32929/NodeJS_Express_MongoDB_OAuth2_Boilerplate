const mongoose = require('../utils/mongoose');

const MongooseSchema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
        autopopulate: {maxDepth: 1}
    },
    scope: [String]
}, {timestamps: true}).plugin(require('mongoose-autopopulate'))

const SchemaModel = module.exports = mongoose.model('oauth_access_token', MongooseSchema);

// C
module.exports.createData = (data, callback) => {
    // if (SchemaModel(data).validateSync(data)) {
    //     callback(new SchemaModel(data).validateSync(data), null)
    // } else {
    //     SchemaModel.create(data, callback);
    // }

    // Because auto populate is not workinig right after creation
    SchemaModel.create(data, (err, createdData) => {
        SchemaModel.findOne(createdData)
            .exec()
            .then(data => callback(null, data))
            .catch(error => callback(error, null));
    });
}

// Ra
module.exports.getAllData = (query, callback) => {
    SchemaModel.find(query).exec().then(data =>
        callback(null, data)).catch(error =>
        callback(error, null));
}

// R1
module.exports.getOneData = (query, callback) => {
    SchemaModel.findOne(query)
        .exec()
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

// U
module.exports.updateOneData = (query, data, callback) => {
    SchemaModel.findOneAndUpdate(query, {$set: data}, {new: true}, callback).catch(error =>
        callback(error, null));
}

// D1
module.exports.removeOneData = (query, callback) => {
    SchemaModel.remove(query, callback);
}

// Da
module.exports.removeAllData = (callback) => {
    SchemaModel.remove({}, callback);
}

