
'use strict';

const auth = require('./common/Auth.js');

module.exports = {
    '/login': {
        post: {
            controller: 'UserController',
            method: 'login',
        },
    },
    '/register': {
        post: {
            controller: 'UserController',
            method: 'register',
        },
    },
    '/login/social': {
        post: {
            controller: 'UserController',
            middleware: [auth()],
            method: 'registerSocialUser',
        },
    },
    '/forgot-password': {
        post: {
            controller: 'UserController',
            method: 'forgotPassword',
        },
    },
    '/reset-password': {
        post: {
            controller: 'UserController',
            method: 'resetPassword',
        },
    },
    '/course/create': {
        post: {
            controller: 'CourseController',
            method: 'create'
        }
    },
    '/course/:id': {
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
