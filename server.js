'use strict';

const http = require('node:http');
const { URL } = require('node:url');

const PORT = Number(process.env.PORT) || 3000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function readNumber(searchParams, name) {
  const value = searchParams.get(name);

  if (value === null || value.trim() === '') {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/static') {
    sendJson(res, 200, {
      header: 'Hello',
      body: 'Octagon NodeJS Test',
    });
    return;
  }

  if (url.pathname === '/dynamic') {
    const a = readNumber(url.searchParams, 'a');
    const b = readNumber(url.searchParams, 'b');
    const c = readNumber(url.searchParams, 'c');

    if (a === null || b === null || c === null) {
      sendJson(res, 200, { header: 'Error' });
      return;
    }

    const result = (a * b * c) / 3;

    sendJson(res, 200, {
      header: 'Calculated',
      body: String(result),
    });
    return;
  }

  sendJson(res, 404, { header: 'Error' });
});

server.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
