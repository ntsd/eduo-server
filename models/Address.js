'use strict';

const mongoose = require('../datasource').getMongoose();
const timestamps = require('mongoose-timestamp');
const _ = require('lodash');

const AddressSchema = new mongoose.Schema({
    location : { lat: { type: Number},
        lng: { type: Number}},
    line1: {type: String, required: true},
    line2: {type: String, required: false},
    city: {type: String, required: true},
    country: {type: String, required: true},
    postalCode: {type: String, required: true},
    primary: {type: Boolean, required: true},
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