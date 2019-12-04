const express = require('express');
const server = express();

// Import router files
const usersRouter = require('../api/users/usersRouter');

server.use(express.json());

// Use Router(s)
server.use('/api/users');

server.get('/', (req, res) => {
  res.send(`
  <h2>Lambda Hubs API</h>
  <p>Welcome to the Lambda Hubs API</p>
`);
});

// export default server; ES6 Modules
module.exports = server; // <<< Export the server
