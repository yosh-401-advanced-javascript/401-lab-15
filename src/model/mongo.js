'use strict';

/**
 *
 *
 * @class Model
 */
class Model {

  constructor(schema) {
    this.schema = schema;
  }

  /**
   *
   *
   * @returns jsonSchema
   * @memberof Model
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  
  /**
   *
   *
   * @param {*} _id
   * @returns find.(queryObject)
   * @memberof Model
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
   *
   *
   * @param {*} record
   * @returns newRecord.save
   * @memberof Model
   */
  post(record) {
    console.log('r',record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   *
   *
   * @param {*} _id
   * @param {*} record
   * @returns findByIdAndUpdate function
   * @memberof Model
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   *
   *
   * @param {*} _id
   * @returns findByIdAndDelete function
   * @memberof Model
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}
/**
 * 
 * @exports exports the Model class
 */

module.exports = Model;
