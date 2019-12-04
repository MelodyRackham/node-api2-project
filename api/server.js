const express = require('express');
const server = express();

// Import router files
const postsRouter = require('./posts/postsRouter');

server.use(express.json());

// Use Router(s)
server.use('/api/posts', postsRouter);

// Sanity check get to localHost
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World! I am working!' });
});

// export default server; ES6 Modules
module.exports = server; // <<< Export the server
