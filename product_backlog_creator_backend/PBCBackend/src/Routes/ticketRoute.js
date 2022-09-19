/**
 * Ticket Routes 
 * @param {Object} app express instance
 * @param {Object} connection databse connection
 * @returns {void}
 */
function initTicketRoutes(app, connection) {
  /** Controller Mockup */
  const controller = {};

  /**
   * Route to get all the Tickets for a specific Sprint
   * /ticket/getAllFor/:sprintId
   */
  app.get(
    '/ticket/getAllFor/:sprintId',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.getAllTicketsFromSprint({req, res});
    }
  );

  /**
   * Route to save a new Ticket for a specific Sprint
   * /ticket/create/:ticketNumber
   */
  app.get(
    '/ticket/create/:ticketNumber',
    (/** @type  {Object} */req, /** @type {Object} */res) => {
      controller.createTicketForSprint(req, res);
    }
  );

  /**
   * Route to remove a Ticket from a Sprint
   * /ticket/remove/:ticketId
   */
  app.get(
    '/ticket/remove/:ticketId',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.removeTicketFromSprint({req, res});
    }
  );

  /**
   * Route to update the Position of a Ticket in the Product Backlog or sprint
   * /ticket/updatePosition/:ticketId/:newPosition
   */
  app.get(
    '/ticket/updatePosition/:ticketId/:newPosition',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.updatePosition({req, res});
    }
  );
}

export default initTicketRoutes;