'use strict';

const Model = require('../mongo.js');
const schema = require('./categories-schema.js');

/**
 *
 *
 * @class Categories
 * @extends {Model}
 */
class Categories extends Model {
  constructor() { super(schema); }
}


/**
 * 
 * @export exports the category model
 */

module.exports = Categories;
