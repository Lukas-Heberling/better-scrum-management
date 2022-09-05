import {
  getAllDepartments,
  createDepartment,
  removeDepartment,
} from '../Model/departmentModel.js';

function initDepartmentRoutes(app, connection) {
  app.get('/department',  async (_, res) => {
    try {
      const result = await getAllDepartments(connection);
      res.send(result.rows);
    } catch(error) {
      res.status(500).send("Something Broke but pls dont cry :(<br>" + error);
    }
  });

  app.get('/department/create/:name', async (req, res) => {
    const { name } = req.params;
    try {
     await createDepartment(connection, name);
      res.send(true);
    } catch(error) {
      res.status(500).send(error);
    }
  });

  app.get('/department/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await removeDepartment(connection, id);
      res.send(true);
    } catch(error) {
      res.status(500).send(error);
    }
  });

  
}

export default initDepartmentRoutes;