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
const Review = models.Review;

const courses = require('./data/courses.json');
var users = require('./data/users.json');
const institutes = require('./data/institutes.json');
var reviews = require('./data/reviews.json');

const reviewService = require('./services/ReviewService');

// players json data
const co = require('co');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

co(function*() {
    logger.info('deleting previous data');
    yield Course.remove({});
    yield User.remove({});
    yield Institute.remove({});
    yield Review.remove({});


    // encrypt password
    yield _.map(users, (u) => function* () {
        if (u.password) {
            u.password = yield helper.hashString(u.password, config.SALT_WORK_FACTOR);
        }
        // const randomCourse = getRandomInt(1, courses.length-1);
        // u.courses = [CourseDoc[randomCourse], CourseDoc[randomCourse-1]];
        // u.bookmarks = [CourseDoc[randomCourse], CourseDoc[randomCourse-1]];
        return;
    });
    // ----- Create User ------
    logger.info(`creating ${users.length} users`);
    const UserDocs = yield User.create(users);

    // ----- Create Institute ------
    logger.info(`create ${institutes.length} institutes data`);
    yield _.map(institutes, (i) => function* () {
        const randomCourseId = getRandomInt(0, users.length-1);
        //console.log(UserDocs[randomCourseId]._id);
        i.createBy = UserDocs[randomCourseId].id;
        return;
    });
    //console.log(institutes);
    const InstituteDocs = yield Institute.create(institutes);

    // ----- Create Course ------
    logger.info(`create ${courses.length} course data`);
    yield _.map(courses, (c) => function* () {
        c.institute = InstituteDocs[getRandomInt(0, institutes.length-1)].id;
        const randomCourseId = getRandomInt(0, users.length-1);
        c.createBy = UserDocs[randomCourseId].id;
        return;
    });
   // console.log(courses);
    const CourseDoc = yield Course.create(courses);

    //----- Create Review -----
    logger.info(`create ${reviews.length} reviews data`);
    yield _.map(reviews, (r) => function* () {

        const randomUserId = getRandomInt(0, users.length-1);
        r.userId = UserDocs[randomUserId].id;
        const randomCourseId = getRandomInt(0, courses.length-1);
        yield reviewService.addReview(CourseDoc[randomCourseId]._id, r);
        return;
    });
    //console.log(reviews);
    //const ReviewDoc = yield Review.create(reviews);


    logger.info('data created successfully');
}).then(() => {
    logger.info('Done');
    process.exit();
}).catch((e) => {
    logger.error(e);
    process.exit();
});
