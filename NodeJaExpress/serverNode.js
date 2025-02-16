const http = require('http');
const fs = require('fs');
const path = require('path');

//const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'eka.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}/`);
});