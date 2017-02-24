
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
            method: 'resetPassword'
        },
    },
    '/course/:id': {
        get: {
            controller: 'CourseController',
            method: 'getSingle'
        }
    },
    '/course/create': {
        post: {
            controller: 'CourseController',
            method: 'create',
            middleware: [auth()],
        }
    },
    '/course/update': {
        get: {
            controller: 'CourseController',
            method: 'update',
            middleware: [auth()],
        }
    },
    '/institute/:id': {
        get: {
            controller: 'InstituteController',
            method: 'getSingle'
        }
    },
    '/institute/create': {
        get: {
            controller: 'InstituteController',
            method: 'create',
            middleware: [auth()],
        }
    },
    '/Institute/update': {
        get: {
            controller: 'InstituteController',
            method: 'update',
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
