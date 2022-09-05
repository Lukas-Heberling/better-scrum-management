function initTicketRoutes(app, connection) {
  app.get('/ticket',  (req, res) => {
    res.send('ticket api');
  });
}

export default initTicketRoutes;