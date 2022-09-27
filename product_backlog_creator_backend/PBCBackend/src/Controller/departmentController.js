import {
  createDepartmentModel,
  removeDepartmentModel,
  getAllDepartmentsModel,
} from '../Model/departmentModel.js';
import ProductBacklogModel from '../Model/productBacklogModel.js';

export const createDepartmentController = async (options) => {
  const { req, res, connection } = options;
  const { name } = req.params;
  const productBacklogModel = new ProductBacklogModel(connection);

  try {
    const { rows } = await createDepartmentModel(connection, name);
    const { department_id: departmentId } = rows[0];
    await productBacklogModel.createProductBacklog({ departmentId });
    res.send(true);
  } catch(error) {
    res.status(500).send("Something Broke but pls dont cry :(<br>" + error);
  }
}

export const removeDepartmentController = async (options) => {
  const { req, res, connection } = options;
  const { id } = req.params;
  try {
    await removeDepartmentModel(connection, id);
    res.send(true);
  } catch(error) {
    res.status(500).send("Something Broke but pls dont cry :(<br>" + error);
  }
}

export const getAllDepartmentsController = async (options) => {
  const { res, connection } = options;
  try {
    const result = await getAllDepartmentsModel(connection);
    res.send(result.rows);
  } catch(error) {
    res.status(500).send("Something Broke but pls dont cry :(<br>" + error);
  }
}