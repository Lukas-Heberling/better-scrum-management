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
 * @summary Model to manage Tickets
 * @param {Object} connection connection to the database
 * @param {Function} connection.query execute a query
 */
const TicketModel = (connection) => {
  /**
   * Add a new ticketNumber to the Product Backlog.
   * @param {Object} options - options to define the model
   * @param  {Number} options.ticketNumber - the number of the ticket that will be added 
   * @param  {Number} options.productBacklogId - the id of the current product backlog 
   * @returns {Promise<PostgresQueryReturn>}
   */
  const add = (options) => new Promise(
    (resolve, reject) => {
      const {ticketNumber, productBacklogId} = options;
      const queryString = `
        INSERT INTO ticket (ticket_tr_id, product_backlog_id, ticket_position)
          (
            SELECT
              $2,
              $1,
              COALESCE(MAX(ticket_position) + 1, 0)
            FROM
              ticket
            WHERE product_backlog_id = $1 LIMIT 1
          )
        RETURNING
          ticket_id,
          ticket_tr_id,
          ticket_position,
          product_backlog_id;
      `;
      connection.query(
        queryString,
        [productBacklogId, ticketNumber],
        (/** @type {Object} */error, /** @type {PostgresQueryReturn} */result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    }
  );

  /**
   * Add a new ticketNumber to the Product Backlog.
   * @param {Object} options - options to define the model
   * @param  {Number} options.ticketId - the id of the ticket that will be removed 
   * @returns {Promise<PostgresQueryReturn>}
   */
  const remove = (options) => new Promise(
    (resolve, reject) => {
      const {ticketId} = options;
      const queryString = `DELETE FROM ticket WHERE ticket_id = $1`;
      connection.query(
        queryString,
        [ticketId],
        (/** @type {Object} */error, /** @type {Object} */result) => {
          if (error) reject(error);
          resolve(result); 
        }
      )
    }
  );

  /**
   * Function to remove all tickets from a product backlog
   * @param {Object} options - options to define the model
   * @returns {Promise<PostgresQueryReturn>}
   */
  const removeAllFromProductBacklog = (options) => new Promise((resolve, reject) => {
    const {productBacklogId} = options;
    const queryString = `
      DELETE FROM ticket
      WHERE productBacklogId = $1;
    `;
    connection.query(
      queryString,
      [productBacklogId],
      (/** @type {Object} */error, /** @type {Object} */result) => {
        if (error) reject(error);
        resolve(result);
      }
    )
  })

  /**
   * Get all tickets for a specific Product Backlog
   * @param {Object} options - options to define the model
   * @param  {Number} options.productBacklogId - the id of the product backlog 
   * @returns {Promise<PostgresQueryReturn>}
   */
  const getAll = (options) => new Promise(
    (resolve, reject) => {
      const {productBacklogId} = options;
      const queryString = `
        SELECT *
        FROM ticket
        WHERE product_backlog_id = $1
        ORDER BY ticket_position;
      `;
      connection.query(
        queryString,
        [productBacklogId],
        (/** @type {Object} */error, /** @type {Object} */ result) => {
          if (error) reject(error);
          resolve(result);
        }
      )
    }
  );

  /**
   * This function increments the position of all tickets
   * which are higher or equal to a specific number in a specific
   * product backlog
   * @param {Object} options - options to define the model
   * @param {Number} options.startingPosition - the startingnumber
   * @param {Number} options.productBacklogId - the id of the current product backlog
   * @returns {Promise<PostgresQueryReturn>}
   */
  const incrementPositions = (options) => new Promise((resolve, reject) => {
    const { startingPosition, productBacklogId } = options;
    const queryString = `
      UPDATE 
        ticket 
      SET
        ticket_position = ticket_position + 1
      WHERE 
        ticket_position >= $1
        AND product_backlog_id = $2;
    `;
    connection.query(
      queryString,
      [startingPosition, productBacklogId],
      (/** @type {Object} */error, /** @type {Object} */result)  => {
        if (error) reject(error);
        resolve(result);
      }
    )
  });

  /**
   * Move a ticket in the ticket table
   * @param {Object} options - options to define the model
   * @param {Number} options.ticketId - the number of the ticket that will be moved
   * @param {Number} options.newPosition - the new index for the ticket
   * @param {Number} options.productBacklogId - the id of the current product backlog
   * @returns {Promise<PostgresQueryReturn>}
   */
  const move = (options) => new Promise((resolve, reject) => {
    const { ticketId, newPosition, productBacklogId } = options;
    const queryString = `
      UPDATE 
        ticket 
      SET 
        ticket_position = $1
      WHERE 
        ticket_id = $2
        AND product_backlog_id = $3;
    `;
    connection.query(
      queryString,
      [newPosition, ticketId, productBacklogId],
      (/** @type {Object} */error, /** @type {Object} */result)  => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });

  return {
    add,
    remove,
    getAll,
    move,
    incrementPositions,
    removeAllFromProductBacklog
  }
}

export default TicketModel;
