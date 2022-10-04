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
 * Models to manage sprints
 * @param {Object} connection connection to the database
 * @param {Function} connection.query execute a query
 */
const DepartmentModel = (connection) => {
  /**
   * Function to create a new Department
   * @param {Object} options - options to define the model
   * @param {String} options.name - name of the department that will be created
   * @returns {Promise<PostgresQueryReturn>}
   */
  const createDepartmentModel = (options) => new Promise((resolve, reject) => {
    const {name} = options;
    const queryString = `
      INSERT INTO department (department_name)
      VALUES ($1)
      RETURNING
        department_id
    `;
    connection.query(
      queryString,
      [name],
      (/** @type {Object} */error, /** @type {Object} */ result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  /**
   * Function to remove a model
   * @param {Object} options - options to define the model
   * @returns {Promise<PostgresQueryReturn>}
   */
  const removeDepartmentModel = (options) => new Promise((resolve, reject) => {
    const {id} = options;
    connection.query(
      "DELETE FROM department WHERE department_id = $1",
      [id],
      (/** @type {Object} */error, /** @type {Object} */result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  /**
   * Function to get all departments
   * @returns {Promise<PostgresQueryReturn>}
   */
  const getAllDepartmentsModel = () => new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM department",
      (/** @type {Object} */error, /** @type {Object} */ result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  return {
    createDepartmentModel,
    removeDepartmentModel,
    getAllDepartmentsModel
  }
}

export default DepartmentModel;

