function getNumberQueryParam(query, name) {
  const value = query[name];

  if (Array.isArray(value) || value === undefined || String(value).trim() === '') {
    return null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
}

function registerDynamicRoute(app) {
  app.get('/dynamic', (req, res) => {
    const a = getNumberQueryParam(req.query, 'a');
    const b = getNumberQueryParam(req.query, 'b');
    const c = getNumberQueryParam(req.query, 'c');

    if (a === null || b === null || c === null) {
      return res.json({ header: 'Error' });
    }

    const result = (a * b * c) / 3;

    return res.json({
      header: 'Calculated',
      body: String(result),
    });
  });
}

module.exports = registerDynamicRoute;
