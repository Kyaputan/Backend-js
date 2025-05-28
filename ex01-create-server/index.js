const http = require("http");
const { json } = require("stream/consumers");
// const dt = require("./dt")

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//     res.writeHead(statusCode, [reasonPhrase], [headers]);
//     res.end('text');
// });

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(JSON.stringify({ author :  "Rachata Singkhet"}));
});

server.listen(port, hostname, () => {
  console.log(`Listening on  http://localhost:${port}`);
});



