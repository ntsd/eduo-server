'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');
const enums = require('../enum');
const Address = require('./Address').AddressSchema;

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    facebookId: {type: String},
    facebookToken: {type: String}
});

UserSchema.plugin(timestamps);

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}


UserSchema.options.toObject.transform = function (doc, ret, options) { // eslint-disable-line no-unused-vars
    const sanitized = _.omit(ret, '__v', '_id', 'password', 'createdAt', 'updatedAt');
    sanitized.id = doc._id;
    return sanitized;
};

module.exports = {
    UserSchema,
};