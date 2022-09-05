function initSprintRoutes(app, connection) {
  app.get('/sprint',  (req, res) => {
    res.send('spring api');
  });
}

export default initSprintRoutes;