const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;
let app = express();


app.get('/', (req, res, next) =>{
  res.send('Hello world from Express.js');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});