'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');
const enums = require('../enum');
const Address = require('./Address').AddressSchema;

const UserSchema = new mongoose.Schema({
    username: {type:String, require: true},
    email: {type: String, required: true},
    password: {type: String, required:true},
    firstName: {type: String},
    lastName: {type: String},
    socialNetworkType: {type: String, enum: _.values(enums.SocialType)},
    socialNetworkId: {type: String},
    socialNetworkAccessToken: {type: String},
    resetPasswordCode: {type: String},
    resetPasswordExpiration: Date,
    avatarUrl: {type: String},
    phone: {type: String},
    role: {type: String, enum: _.values(enums.Role)},
    address: {type: Address},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

UserSchema.plugin(timestamps);

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}


UserSchema.options.toObject.transform = function (doc, ret) { // eslint-disable-line no-unused-vars
    const sanitized = _.omit(ret, '__v', '_id', 'password', 'createdAt', 'updatedAt');
    sanitized.id = doc._id;
    return sanitized;
};

module.exports = {
    UserSchema,
};