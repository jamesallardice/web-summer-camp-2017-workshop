const path = require('path');
const config = require('config');
const express = require('express');

// Configure Express.
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Start the server.
const server = app.listen(config.get('port'), () => {

  const { port } = server.address();
  console.log(`Server running on port ${port}`);
});
