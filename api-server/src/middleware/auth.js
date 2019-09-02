'use strict';

const User = require('../model/user.js');

/**
 * Basic Auth Function
 * @param req
 * @param res
 * @param next
 * @returns {Promise<T>}
 */
module.exports = (req, res, next) => {
  try {
    let [authType, authString] = req.headers.authorization.split(/\s+/);

    switch (authType.toLowerCase()) {
    case 'basic':
      let base64Buffer = Buffer.from(authString, 'base64');
      let BufferString = base64Buffer.toString();
      let [username, password] = BufferString.split(':');
      return User.authenticateBasic({ username, password })
        .then(user => {
          req.user = user;
          req.token = user.generateToken();
          next();
        })
        .catch(() => next('Invalid Username or Password'));
    case 'bearer':
      return User.authenticateToken(authString)
        .then(user => {
          req.user = user;
          req.token = user.generateToken();
          next();
        })
        .catch(() => next('Invalid Token'));
    default:
      next('Unauthorized');
    }
  } catch (e) {
    next(e);
  }

};
