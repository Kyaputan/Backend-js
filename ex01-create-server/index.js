const http = require("http");
const dt = require("./dt")

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//     res.writeHead(statusCode, [reasonPhrase], [headers]);
//     res.end('text');
// });

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("The date and time are currently: " + dt.myDateTime());
});

server.listen(port, hostname, () => {
  console.log('Listening on 127.0.0.1:8080');
});



