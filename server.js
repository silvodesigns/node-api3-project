const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen('5000', ()=> {
  console.log("Server listening on port 5000");
});

//custom middleware
function logger(req, res, next) {}

module.exports = server;
