
'use strict';

const auth = require('./common/Auth.js');

module.exports = {
    '/course/create': {
        post: {
            controller: 'CourseController',
            method: 'create'
        }
    },
    '/course/getsingle': {
        get: {
            controller: 'CourseController',
            method: 'getSingle'
        }
    }

    // '/login/social': {
    //     post: {
    //         controller: 'UserController',
    //         middleware: [auth()],
    //         method: 'registerSocialUser',
    //     },
    // }
};
