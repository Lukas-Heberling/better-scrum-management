export const createDepartment = (connection, name) => new Promise((resolve, reject) => {
  connection.query(
    "INSERT INTO department (department_name) VALUES ($1)",
    [name],
    (error, result) => {
      if (error) reject(error);
      resolve(result);
    }
  );
});

export const removeDepartment = (connection, id) => new Promise((resolve, reject) => {
  connection.query(
    "DELETE FROM department WHERE department_id = $1",
    [id],
    (error, result) => {
      if (error) reject(error);
      resolve(result);
    }
  );
});

export const getAllDepartments = (connection) => new Promise((resolve, reject) => {
  connection.query(
    "SELECT * FROM department",
    (error, result) => {
      if (error) reject(error);
      resolve(result);
    }
  );
});

