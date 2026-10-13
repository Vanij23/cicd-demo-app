const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { createServer } = require('./app');

function get(port, path) {
  return new Promise((resolve, reject) => {
    http.get({ port, path }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

test('home route returns 200 and greeting', async () => {
  const server = createServer().listen(0);
  const { port } = server.address();
  const r = await get(port, '/');
  server.close();
  assert.strictEqual(r.status, 200);
  assert.match(r.body, /Hello from the CI\/CD Pipeline/);
});

test('health route returns OK', async () => {
  const server = createServer().listen(0);
  const { port } = server.address();
  const r = await get(port, '/health');
  server.close();
  assert.strictEqual(r.status, 200);
  assert.strictEqual(r.body, 'OK');
});
