/** Import Routes */
import initDepartmentRoutes from './departmentRoute.js';
import initSprintRoutes from './sprint.js';
import initTicketRoutes from './ticket.js';

/**
 * The Router defines all the routes in the api
 * @param {Object} app express js
 * @param {Object} connection database connection
 */
function router(app, connection) {
  /** Define Routes */
  initDepartmentRoutes(app, connection);
  initSprintRoutes(app, connection);
  initTicketRoutes(app, connection);

  /** Catch all wrong urls and send a charming message */
  app.get('*', (_, res) => res.send('Wrong URL but please dont cry :('));
}

export default router;