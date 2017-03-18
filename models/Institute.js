'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');
const Address = require('./Address').AddressSchema;

const InstituteSchema = new mongoose.Schema({
    name: {type:String, require:true},
    address: {type: Address}
});

InstituteSchema.plugin(timestamps);

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