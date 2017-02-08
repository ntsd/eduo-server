
'use strict';

const auth = require('./common/Auth.js');

module.exports = {
    '/course/create': {
        post: {
            controller: 'CourseController',
            method: 'create'
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
