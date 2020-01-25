const express = require('express');
//imports user's route into our server
const userRoutes = require('./users/userRouter');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//hook up server with mini server for user routes
server.use('/users', userRoutes);

server.listen('5000', ()=> {
  console.log("Server listening on port 5000");
});

//custom middleware
function logger(req, res, next) {}

module.exports = server;
