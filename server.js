const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(data));
}

function getNumberParam(searchParams, name) {
  const value = searchParams.get(name);

  if (value === null || value.trim() === '') {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/static') {
    return sendJson(res, 200, {
      header: 'Hello',
      body: 'Octagon NodeJS Test',
    });
  }

  if (requestUrl.pathname === '/dynamic') {
    const a = getNumberParam(requestUrl.searchParams, 'a');
    const b = getNumberParam(requestUrl.searchParams, 'b');
    const c = getNumberParam(requestUrl.searchParams, 'c');

    if (a === null || b === null || c === null) {
      return sendJson(res, 200, { header: 'Error' });
    }

    const result = (a * b * c) / 3;

    return sendJson(res, 200, {
      header: 'Calculated',
      body: String(result),
    });
  }

  return sendJson(res, 404, { header: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
