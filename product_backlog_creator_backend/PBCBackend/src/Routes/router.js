import fs from 'fs';
/** Import Routes */
import initDepartmentRoutes from './departmentRoute.js';
import initSprintRoutes from './sprintRoute.js';
import initTicketRoutes from './ticketRoute.js';

/**
 * The Router defines all the routes in the api
 * @param {Object} app express js
 * @param {Object} connection database connection
 * @returns {void}
 */
function router(app, connection) {

  /** Define Routes */
  initDepartmentRoutes(app, connection);
  initSprintRoutes(app, connection);
  initTicketRoutes(app, connection);

  /** Redirect to the documentation */
  app.get(
    '/docs',
    (/** @type {Object} */req, /** @type {Object} */ res) => {
      res.writeHead(200, { 'content-type': 'text/html' });
      fs.createReadStream('src/View/apiDocumentationView.html').pipe(res);
    }
  );

  app.get(
    '*',
    (/** @type {Object} */req, /** @type {Object} */ res) => res.send("Wrong URL but pls dont cry :(")
  );
}

export default router;