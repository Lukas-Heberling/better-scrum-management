import createClientResponse from "../Helper/responseHelper.js";
import TicketModel from "../Model/ticketModel.js";

/**
 * TicketController
 * @param {Object} connection connection to the database
 * @param {Function} connection.query execute a query
 */
const TicketController = (connection) => {
  const ticketModel = TicketModel(connection);
  
  /**
   * Adds a new ticket to the current product backlog
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params
   * @param {Number} options.req.params.ticketNumber - The number of the ticket that will be added
   * @param {Number} options.req.params.productBacklogId - The id of the current product backlog
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const add = async (options) => {
    const {req, res} = options;
    const { params } = req;
    try {
      const { rows } = await ticketModel.add(params);
      const response = createClientResponse({
        values: rows,
        infos: ["Successfully added a new Ticket"],
        type: "success",
      });
      res.send(response);
    } catch (error) {
      const { message: errorMessage } = error;
      const response = createClientResponse({
        errors: [errorMessage],
        type: "error",
      });
      res.status(500).send(response);
    }
  }

  /**
   * Removes a ticket from the current Product Backlog
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params
   * @param {Number} options.req.params.ticketId - The number of the ticket that will be removed
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const remove = async (options) => {
    const {req, res} = options;
    const { params } = req;
    try {
      const { rows } = await ticketModel.remove(params);
      const response = createClientResponse({
        values: rows,
        infos: ["Successfully removed ticket"],
        type: "success",
      });
      res.send(response);
    } catch(error) {
      const { message: errorMessage } = error;
        const response = createClientResponse({
          errors: [errorMessage],
          type: "error",
        });
        res.status(500).send(response);
    }
  }

  /**
   * Gets all tickets for a specific product Backlog
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params
   * @param {Number} options.req.params.productBacklogId - The number of the product
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const getAll = async (options) => {
    const {req, res} = options;
    const { params } = req;
    try {
      const { rows } = await ticketModel.getAll(params);
      const response = createClientResponse({
        values: rows,
        infos: ["All tickets have been loaded"],
        type: "success",
      });
      res.send(response);
    } catch(error) {
      const { message: errorMessage } = error;
      const response = createClientResponse({
        errors: [errorMessage],
        type: "error",
      });
      res.status(500).send(response);
    }
  }

  /**
   * Gets all tickets for a specific product Backlog
   * @param {Object} options
   *
   * @param {Object} options.req
   * @param {Object} options.req.params
   * @param {Number} options.req.params.ticketId - The number of the ticket that will be moved
   * @param {Number} options.req.params.newPosition - The new Index of the ticket
   * @param {Number} options.req.params.productBacklogId - The id of the current Product Backlog
   *
   * @param {Object} options.res
   * @param {Function} options.res.status Set a status for the resolve value
   * @param {Function} options.res.send Send the resolve Value to the client
   * 
   * @returns {Promise}
   */
  const move = async (options) => {
    const {req, res} = options;
    const {params} = req; 
    const { newPosition, productBacklogId } = req.params;
    try {
      await ticketModel.incrementPositions({
        startingPosition: newPosition,
        productBacklogId
      });
      const { rows } = await ticketModel.move(params);
      const response = createClientResponse({
        values: rows,
        infos: ["Ticket has been moved successfully"],
        type: "success",
      });
      res.send(response);
    } catch(error) {
      const { message: errorMessage } = error;
      const response = createClientResponse({
        errors: [errorMessage],
        values: error,
        type: "error",
      });
      res.status(500).send(response);
    }
  }

  return {
    add,
    getAll,
    remove,
    move,
  }
}

export default TicketController;