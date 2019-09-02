'use strict';
const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

/**
 * GET for given model
 * @route GET '/api/v1/categories'
 * @returns {object} 200 {result}
 * @returns {Error} 500
 */
router.get('/api/v1/categories', auth, getCategories);


/**
 * POST for given model
 * @route POST '/api/v1/categories'
 * @returns {object} 200 {result}
 * @returns {Error} 500
 */
router.post('/api/v1/categories',  auth, postCategories);


/**
 * GET for given model by id
 * @route GET'/api/v1/categories/:id'
 * @returns {object} 200 {result}
 * @returns {Error} 500
 */
router.get('/api/v1/categories/:id', auth, getCategory);


/**
 * PUT for given model by id
 * @route PUT '/api/v1/categories/:id'
 * @returns {object} 200 {result}
 * @returns {Error} 500
 */
router.put('/api/v1/categories/:id', auth, putCategories);


/**
 * DELETE for given model by id
 * @route DELETE '/api/v1/categories/:id'
 * @returns {object} 200 {result}
 * @returns {Error} 500
 */
router.delete('/api/v1/categories/:id', auth, deleteCategories);


const Categories = require('./model/categories/categories-model');
const categories = new Categories();

/**
 * gets multiple category objects
 * @param request
 * @param response
 * @param next
 */
function getCategories(request,response,next) {
  categories.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

/**
 * returns a category
 * @param request
 * @param response
 * @param next
 */
function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * creates a category
 * @param request
 * @param response
 * @param next
 */
function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * updates a category
 * @param request
 * @param response
 * @param next
 */
function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * deletes a category
 * @param request
 * @param response
 * @param next
 */
function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}
module.exports = router;