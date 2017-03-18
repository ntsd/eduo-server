'use strict';

const _ = require('lodash');
const mongoose = require('../datasource').getMongoose();
const timestamps = require('mongoose-timestamp');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Address = require('./Address').AddressSchema;


const CourseSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    description: {type: String, required: false},
    hour : {type: Number},
    price: {type: Number, required: false},
    teacher: [{type: ObjectId, required: false, ref:'User'}],
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    email : {type: String, required: false},
    courseTime: {type: String, require: false},
    study_times: {type:Number},
    promotion_price: {type: Number},
    rating: {type: Number},
    address: {type: Address},
    website: {type: String},
    phone: {type: String},
    tags: {type:Object},
    images: {type:String},
    institute: {type: ObjectId, ref:'Institute'}

});

CourseSchema.plugin(timestamps);

if (!CourseSchema.options.toObject) {
    CourseSchema.options.toObject = {};
}

CourseSchema.options.toObject.transform = function (doc, ret, options) {
    const sanitized = _.omit(ret, '__v', '_id', 'createdAt', 'updatedAt');
    sanitized.id = doc._id;
    return sanitized;
};

CourseSchema.index({ subject: 'text', description: 'text', teacher: 'text' });

module.exports = {
    CourseSchema,
};