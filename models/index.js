'use strict';

const config = require('config');

const db = require('../datasource').getDb(config.db.url, config.db.poolSize);

// Course model
const CourseSchema = require('./Course').CourseSchema;

const Course = db.model('Course', CourseSchema);

module.exports = {
    Course,
};