'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
//const timestamps = require('mongoose-timestamp');
const Address = require('./Address').AddressSchema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const InstituteSchema = new mongoose.Schema({
    name: {type:String, require:true},
    address: {type: Address},
    createBy: {type: ObjectId, required: true, ref:'User'},
    coverImage: {type: String}
});

if (!InstituteSchema.options.toObject) {
    InstituteSchema.options.toObject = {};
}


InstituteSchema.options.toObject.transform = function (doc, ret, options) { // eslint-disable-line no-unused-vars
    const sanitized = _.omit(ret, '__v', '_id', 'createdAt', 'updatedAt');
    sanitized.id = doc._id;
    return sanitized;
};

module.exports = {
    InstituteSchema,
};