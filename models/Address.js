'use strict';

const mongoose = require('../datasource').getMongoose();
const timestamps = require('mongoose-timestamp');
const _ = require('lodash');

const AddressSchema = new mongoose.Schema({
    //[lat,lng]
    coordinates: {type: [Number], required: true, index: '2dsphere'},
    line1: {type: String, required: true},
    line2: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    postalCode: {type: String, required: false},
    private: {type: Boolean, required: false, default: false},
});

AddressSchema.plugin(timestamps);

if (!AddressSchema.options.toObject) {
    AddressSchema.options.toObject = {};
}

AddressSchema.options.toObject.transform = function (doc, ret) {
    const sanitized = _.omit(ret, '__v', '_id', 'createdAt', 'updatedAt');
    return sanitized;
};

module.exports = {
    AddressSchema,
};