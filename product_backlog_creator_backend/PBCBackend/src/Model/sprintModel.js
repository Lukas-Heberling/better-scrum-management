// @ts-check

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
const sprintModel = (connection) => {
  /**
   * Create a Sprint for a department
   * @param {Object} options options to define the model
   * @param {String} options.sprintName name of the new sprint
   * @param {Number} options.sprintNumber number of the sprint
   * @param {Number} options.departmentId id of the referencing department
   * @returns {Promise<PostgresQueryReturn>}
   */
  const createSprint = (options) => new Promise((resolve, reject) => {
    const {
      sprintName,
      sprintNumber,
      departmentId,
    } = options;
    const queryString = `
      INSERT INTO sprint (sprint_number, sprint_name, department_id)
      VALUES ($1, $2, $3)
      RETURNING
        sprint_id,
        sprint_number,
        sprint_name,
        department_id
    `;
    connection.query(
      queryString,
      [sprintNumber, sprintName, departmentId],
      (/** @type {Object} */error, /** @type {PostgresQueryReturn} */result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  /**
   * Remove a sprint from a department
   * WATCH OUT If a sprint gets removed all the belonging
   * Tickets have to be deleted to
   * @param {Object} options options to define the model
   * @param {Number} options.sprintId - The Id of the sprint to remove
   * @returns {Promise<PostgresQueryReturn>}
   */
  const removeSprint = (options) => new Promise((resolve, reject) => {
    const {sprintId} = options;
    const queryString = `DELETE FROM sprint WHERE sprint_id = $1`;
    connection.query(
      queryString,
      [sprintId],
      (/** @type {Object} */error, /** @type {PostgresQueryReturn} */result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  /**
   * Get all sprints for a department
   * @param {Object} options - options to define the model
   * @param {Number} options.departmentId - Id for the department of the sprints
   * @returns {Promise<PostgresQueryReturn>}
   */
  const getAll = (options) => new Promise((resolve, reject) => {
    const {departmentId} = options;
    const queryString = `SELECT * FROM sprint WHERE department_id = $1`;
    connection.query(
      queryString,
      [departmentId],
      (/** @type {Object} */error, /** @type {PostgresQueryReturn} */result) => {
        if (error) reject(error);
        resolve(result); 
      }
    );
  });

  return {
    createSprint,
    removeSprint,
    getAll,
  }
}

export default sprintModel;