import sprintModel from "../Model/sprintModel.js"; 
import createClientResponse from "../Helper/responseHelper.js";

/**
 * Sprint Controller
 * @param {object} connection the database connection
 * @param {function} connection.query function to query data from the database
 */
const sprintController = (connection) => {
  const model = sprintModel(connection);

  /**
   * Creates a Sprint for a specific department
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params 
   * @param {String} options.req.params.sprintName the name of the new created sprint
   * @param {Number} options.req.params.sprintNumber the number for the new sprint
   * @param {Number} options.req.params.departmentId id of the department
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const createSprintForDepartment = async (options) => {
    const {req, res} = options;
    const {params: modelDefinitions} = req;
    try {
      const {rows} = await model.createSprint(modelDefinitions);
      const response = createClientResponse({
        infos: ["Successfully created a new Sprint"],
        type: 'success',
        values: rows,
      }); 
      res.send(response);
    } catch(error) {
      const {name: errorName} = error;
      const response = createClientResponse({
          errors: [errorName],
          type: 'error',
      });
      res.status(500).send(response);
    }
  }
  
  /**
   * Creates a Sprint for a specific department
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params 
   * @param {Number} options.req.params.sprintId - id of the sprint to delete
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const removeSprintFromDepartment = async (options) => {
    const {req, res} = options;
    const {params: modelDefinitions} = req;
    try {
      const {rows} = await model.removeSprint(modelDefinitions);
      const successResponse = createClientResponse({
        type: "success",
        infos: ["Successfully removed Sprint"],
        values: rows
      });
      res.send(successResponse);
    } catch(error) {
      res.status(500).send(error);
    }
  }
  
  /**
   * Get all Sprints that belong to a
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params 
   * @param {Number} options.req.params.departmentId id of the department
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const getAllSrprintsFromDeparment = async (options) => {
    const {req, res} = options;
    const {params: modelDefinitions} = req;
    try {
      const  { rows } = await model.getAll(modelDefinitions);
      const successResponse = createClientResponse({
        type: 'success',
        infos: ["Successfully selected all the rows for the departemnt"],
        values: rows 
      });
      res.send(successResponse);
    } catch(error) {
      const {name: errorName} = error;
      const errorResponse = createClientResponse({
        type: 'error',
        errors: [errorName],
      });
      res.status(500).send(errorResponse);
    }
  }

  return {
    createSprintForDepartment,
    removeSprintFromDepartment,
    getAllSrprintsFromDeparment,
  }
}

export default sprintController;