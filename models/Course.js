/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';

const _ = require('lodash');
const mongoose = require('../datasource').getMongoose();
const timestamps = require('mongoose-timestamp');

const CourseSchema = new mongoose.Schema({
    // format [longitude, latitude]
    // needed for $near query https://docs.mongodb.com/manual/reference/operator/query/near/
    courseId: {type: [Number], required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    teacher: String,
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    email : {type: String, required: true},
    courseTime: {type: String, require: true}
});

CourseSchema.plugin(timestamps);

if (!CourseSchema.options.toObject) {
    CourseSchema.options.toObject = {};
}

CourseSchema.options.toObject.transform = function (doc, ret, options) {
    const sanitized = _.omit(ret);
    return sanitized;
};


module.exports = {
    CourseSchema,
};