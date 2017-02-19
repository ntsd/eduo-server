/**
 * Created by Jiravat on 8/2/2560.
 */
'use strict';
//do promise
global.Promise = require('bluebird');

const config = require('config');
const _ = require('lodash');
const logger = require('./common/logger');
const helper = require('./common/helper');
const models = require('./models');
const moment = require('moment');

const Course = models.Course;
const User = models.User;

const courses = require('./data/courses.json');
var users = require('./data/users.json');

// players json data
const co = require('co');

co(function*() {
    logger.info('deleting previous data');
    yield Course.remove({});
    yield User.remove({});

    // ----- Create Course ------
    logger.info(`create ${courses.length} course data`);
    const CourseDoc = yield Course.create(courses);

    // encrypt password
    yield _.map(users, (u) => function* () {
        if (u.password) {
            u.password = yield helper.hashString(u.password, config.SALT_WORK_FACTOR);
        }
        u.courses = [CourseDoc[helper.randomInteger(courses.length)], CourseDoc[helper.randomInteger(courses.length)]];
        u.bookmarks = [CourseDoc[2], CourseDoc[3]];
        return;
    });
    // ----- Create User ------
    logger.info(`creating ${users.length} users`);
    const providerUserDocs = yield User.create(users);


    logger.info('data created successfully');
}).then(() => {
    logger.info('Done');
    process.exit();
}).catch((e) => {
    logger.error(e);
    process.exit();
});
