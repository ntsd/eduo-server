'use strict';

const _ = require('lodash');
const mongoose = require('../datasource').getMongoose();
const timestamps = require('mongoose-timestamp');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Address = require('./Address').AddressSchema;
const enums = require('../enum');

const CourseSchema = new mongoose.Schema({
    name: {type:String, require:true},
    subject: {type: String},
    description: {type: String, required: false},
    price: {type: Number, required: false},
    teacher: [{type: String, required: false}],
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    email : {type: String, required: false},
    daysOfWeek: [{type: String, require: false, enum: _.values(enums.Days)}],
    startTimeHour: {type:Number},
    startTimeMinute: {type:Number},
    hourPerDay: {type:Number},
    studyTimes: {type:Number},
    promotionPrice: {type: Number},
    rating: {type: Number},
    address: {type: Address},
    website: {type: String},
    phone: {type: String},
    tags: {type:[String]},
    images: {type:[String]},
    coverImage: {type:String},
    institute: {type: ObjectId, ref:'Institute'},
    createBy: {type: ObjectId, required: true, ref:'User'},
    reviews: [{type: ObjectId, ref:'Review'}]
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

CourseSchema.index({subject: 'text',name:'text', description: 'text', teacher: 'text' });

module.exports = {
    CourseSchema,
};