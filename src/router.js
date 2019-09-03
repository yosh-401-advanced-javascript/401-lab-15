'use strict';

const express = require('express');
const apiRouter = express.Router();

const User = require('./model/user.js');
const Post = require('./model/post.js');
const auth = require('./middleware/auth.js');

/**
 * API router for user signup
 * @route POST
 * @param request
 * @param response
 * @param next
 * @param /signup
 * @param auth
 * @returns {object} 200 {result}
 * @returns {Error} 500
 */
apiRouter.post('/signup', (req, res, next) => {
  const user = new User(req.body);
  // save
  user.save()
    .then((user) => {
      let token = user.generateToken();
      res.cookie('auth', token);
      res.set('token', token);
      res.status(200);
      res.send(token);
    })
    .catch((err) => next(err));
});
/**
 * API router for user signin
 * @route POST
 * @param request
 * @param response
 * @param next
 * @param /signin
 * @param auth
 */
// Basic check credentials with middleware
apiRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

/**
* API router for user post
* @route GET
* @param request
* @param response
* @param next
* @param /post
* @param auth
* @returns {object} 200 {result}
* @returns {Error} 500
*/
apiRouter.get('/posts', auth, (req, res, next) => {
  Post.find({})
    .then(posts => {
      res.status(200);
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(posts);
    })
    .catch(err => next(err));
});

module.exports = apiRouter;