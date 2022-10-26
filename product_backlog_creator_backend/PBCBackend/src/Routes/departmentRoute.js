import {
  createDepartmentController,
  removeDepartmentController,
  getAllDepartmentsController,
} from '../Controller/departmentController.js';

function initDepartmentRoutes(app, connection) {
  app.get('/department',  async (_, res) => {
    res.send(`
      <h3>Department API</h3>
      <p>/department/getAll</p>
      <p>/department/create/[departmentName]</p>
      <p>/department/remove/[departmentId]</p>
    `)
  });

  app.get('/department/getAll', async (req, res) => getAllDepartmentsController({
      req,  
      res,
      connection,
    })
  );

  app.get('/department/create/:name', async (req, res) => createDepartmentController({
      req,
      res,
      connection,
    })
  );

  app.get('/department/remove/:id', async (req, res) => removeDepartmentController({
      req,
      res,
      connection,
    })
  );
}

export default initDepartmentRoutes;