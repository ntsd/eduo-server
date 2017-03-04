
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
            middleware: [auth()],
            method: 'resetPassword'
        },
    },
    '/course/:id': {
        get: {
            controller: 'CourseController',
            method: 'getSingle'
        },
        put: {
            controller: 'CourseController',
            method: 'update',
            middleware: [auth()],
        },
        delete: {
            controller: 'CourseController',
            method: 'delete',
            middleware: [auth()],
        }
    },
    '/course/create': {
        post: {
            controller: 'CourseController',
            method: 'create',
            middleware: [auth()],
        }
    },
    '/institute/:id': {
        get: {
            controller: 'InstituteController',
            method: 'getSingle'
        },
        put: {
            controller: 'InstituteController',
            method: 'update',
            middleware: [auth()],
        },
        delete: {
            controller: 'InstituteController',
            method: 'delete',
            middleware: [auth()],
        }
    },
    '/institute/create': {
        get: {
            controller: 'InstituteController',
            method: 'create',
            middleware: [auth()],
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
