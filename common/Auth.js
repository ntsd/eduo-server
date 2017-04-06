'use strict';

const jwt = require('express-jwt');
const config = require('config');

const jwtCheck = jwt({
  // the auth0 doesn't base 64 encode the jwt secret now
  secret: new Buffer(config.JWT_SECRET, 'base64'),
  audience: config.AUTH0_CLIENT_ID,
  requestProperty: 'auth',
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return req.query.token;
  },
});

/**
 * Export a function
 * @return {Function}       return the middleware function
 */
module.exports = () => jwtCheck;
