function registerStaticRoute(app) {
  app.get('/static', (req, res) => {
    res.json({
      header: 'Hello',
      body: 'Octagon NodeJS Test',
    });
  });
}

module.exports = registerStaticRoute;
