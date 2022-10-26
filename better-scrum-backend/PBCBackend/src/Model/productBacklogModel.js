/**
 * @typedef {any} columnValue
 */

/**
 * @typedef PostgresQueryReturn
 * @property {{columnName: columnValue}[]} rows the query result 
 * @property {String} command the executed command
 * @property {Number} rowCount the amount of returned rows
 */

/**
 * ProductBacklogModel
 * @class
 */
class ProductBacklogModel {
  /**
   * @constructor
   * @param {Object} connection connection to the database
   * @param {Function} connection.query execute a query
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Create a product backlog entry for a department
   * @param {Object} options
   * @param {Number} options.departmentId - The department the product backlog will get created for
   * @returns {Promise<PostgresQueryReturn>}
   */
  createProductBacklog(options) {
    return new Promise((resolve, reject) => {
      const { departmentId } = options;
      console.log("Create Product Backlog");
      console.log(`departmentID: ${departmentId}`);
      const queryString = `INSERT INTO product_backlog (department_id) VALUES ($1)`;
      this.connection.query(
        queryString,
        [departmentId],
        (/** @type {Object}*/error, /** @type {PostgresQueryReturn} */result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  }
}

export default ProductBacklogModel;