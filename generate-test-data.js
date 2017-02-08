/**
 * Created by Jiravat on 8/2/2560.
 */
'use strict';

const config = require('config');
const _ = require('lodash');
const logger = require('./common/logger');
const helper = require('./common/helper');
const models = require('./models');
const moment = require('moment');

const courses = require('./data/courses.json');

const Course = models.Course;

// players json data
const co = require('co');

co(function*() {
    logger.info('deleting previous data');
    yield Course.remove({});

    logger.info(`create ${courses.length} course data`);
    yield Course.create(courses);

    logger.info('data created successfully');
}).then(() => {
    logger.info('Done');
    process.exit();
}).catch((e) => {
    logger.error(e);
    process.exit();
});
