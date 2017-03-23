'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: {type:String, require:true},
    rating: {type:Number}
});

ReviewSchema.plugin(timestamps);

if (!ReviewSchema.options.toObject) {
    ReviewSchema.options.toObject = {};
}


ReviewSchema.options.toObject.transform = function (doc, ret) { // eslint-disable-line no-unused-vars
    const sanitized = _.omit(ret, '__v', '_id', 'createdAt', 'updatedAt');
    sanitized.id = doc._id;
    return sanitized;
};

module.exports = {
    ReviewSchema,
};