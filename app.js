const http = require('http');

const VERSION = 'Version 1';

function createServer() {
  return http.createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('OK');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hello from the CI/CD Pipeline - ${VERSION}</h1>`);
  });
}

if (require.main === module) {
  createServer().listen(3000, () => console.log('App running on port 3000'));
}

module.exports = { createServer, VERSION };
