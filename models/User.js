'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');
const Address = require('./Address').AddressSchema;

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    facebook: {
        id:{type: Object, trim: true},
        token: {type:String, trim:true},
        email: {type:String, trim:true},

    },
    courses: [{type: ObjectId}],
    bookmark: [{type: ObjectId}]
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