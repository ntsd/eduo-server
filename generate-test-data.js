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
const Institute = models.Institute;

const courses = require('./data/courses.json');
var users = require('./data/users.json');
const institutes = require('./data/institutes.json');

// players json data
const co = require('co');

co(function*() {
    logger.info('deleting previous data');
    yield Course.remove({});
    yield User.remove({});

    // ----- Create Institute ------
    const InstituteDocs = yield Institute.create(institutes);

    // ----- Create Course ------
    logger.info(`create ${courses.length} course data`);
    yield _.map(courses, (c) => function* () {
        c.institute = InstituteDocs[0].id;
        return;
    });
    const CourseDoc = yield Course.create(courses);

    // encrypt password
    yield _.map(users, (u) => function* () {
        if (u.password) {
            u.password = yield helper.hashString(u.password, config.SALT_WORK_FACTOR);
        }
        u.courses = [CourseDoc[1], CourseDoc[0]];
        u.bookmarks = [CourseDoc[2], CourseDoc[3]];
        return;
    });
    // ----- Create User ------
    logger.info(`creating ${users.length} users`);
    const UserDocs = yield User.create(users);

    logger.info('data created successfully');
}).then(() => {
    logger.info('Done');
    process.exit();
}).catch((e) => {
    logger.error(e);
    process.exit();
});
