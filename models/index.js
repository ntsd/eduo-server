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

module.exports = {
    Course,
    Institute,
    User
};