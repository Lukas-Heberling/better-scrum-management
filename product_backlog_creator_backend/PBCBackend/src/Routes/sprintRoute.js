import sprintController from "../Controller/sprintController.js";

/**
 * Sprint Routes
 * @param {Object} app express instance
 * @param {Object} connection databse connection
 * @returns {void}
 */
function initSprintRoutes(app, connection) {
  const controller = sprintController(connection);

  /**
   * /sprint/create/:departmentId/:sprintName/:sprintNumber
   */
  app.get(
    '/sprint/create/:departmentId/:sprintName/:sprintNumber',
    (/** @type {Object} */ req, /** @type {Object} */ res) => {
      controller.createSprintForDepartment({req, res});
    }
  );

  /**
   * /sprint/remove/:sprintId
   */
  app.get(
    '/sprint/remove/:sprintId',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.removeSprintFromDepartment({req, res});
    }
  );

  /**
   * /sprint/getAllFor/:departmentId
   */
  app.get(
    '/sprint/getAllFor/:departmentId',
    (/** @type {Object} */ req, /** @type {Object} */ res) => {
      controller.getAllSrprintsFromDeparment({req, res});
    }
  );
}

export default initSprintRoutes;