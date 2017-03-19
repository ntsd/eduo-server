'use strict';

const config = require('config');

const db = require('../datasource').getDb(config.db.url, config.db.poolSize);

// Course model
const CourseSchema = require('./Course').CourseSchema;
const Course = db.model('Course', CourseSchema);
//Institute model
const InstituteSchema = require('./Institute').InstituteSchema;
const Institute = db.model('Institute', InstituteSchema);
//User model
const UserSchema = require('./User').UserSchema;
const User = db.model('User', UserSchema);
// Address
const AddressSchema = require('./Address').AddressSchema;
const Address = db.model('Address', AddressSchema);
//Review model
const ReviewSchema = require('./Review').ReviewSchema;
const Review = db.model('Review', ReviewSchema);

module.exports = {
    Course,
    Institute,
    User,
    Address,
    Review
};