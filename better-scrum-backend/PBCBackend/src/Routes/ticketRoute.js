import TicketController from "../Controller/ticketController.js";

/**
 * Ticket Routes 
 * @param {Object} app express instance
 * @param {Object} connection databse connection
 * @returns {void}
 */
function initTicketRoutes(app, connection) {
  /** Controller Mockup */
  const controller = TicketController(connection);

  /**
   * Route to get all the Tickets for a specific Product Backlog
   * /ticket/getAllFor/:productBacklogId
   */
  app.get(
    '/ticket/getAll/:productBacklogId',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.getAll({req, res});
    }
  );

  /**
   * Route to add a new Ticket to a specific product backlog
   * /ticket/create/:ticketNumber
   */
  app.get(
    '/ticket/add/:ticketNumber/:productBacklogId',
    (/** @type  {Object} */req, /** @type {Object} */res) => {
      controller.add({req, res});
    }
  );

  /**
   * Route to remove a Ticket
   * /ticket/remove/:ticketId
   */
  app.get(
    '/ticket/remove/:ticketId',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.remove({req, res});
    }
  );

  /**
   * Route to update the Position of a Ticket in the Product Backlog
   * /ticket/move/:productBacklogId/:ticketId/:newPosition
   */
  app.get(
    '/ticket/move/:productBacklogId/:ticketId/:newPosition',
    (/** @type {Object} */req, /** @type {Object} */res) => {
      controller.move({req, res});
    }
  );
}

export default initTicketRoutes;