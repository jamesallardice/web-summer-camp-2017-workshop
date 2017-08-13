const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('config');
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const pug = require('pug');
const isAuthenticated = require('./middleware/auth');

// Configure Express. We use Pug (formerly known as Jade) as a view engine and
// set up a few middleware functions:
//
// - `express.static` allows Express to serve static files from the file system
// - `cookieParser` allows us to parse the Cookie header from inbound requests
// - `multer` allows us to parse multipart form-post request bodies
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(multer().none());

// Set up route handlers. We define a GET handler to render the login page and
// a POST handler to perform the login, as well as a protected GET handler for
// the dashboard page which should only be accessible to logged-in users.
app.get('/', (req, res) => {
  res.status(200).render('login');
});

app.post('/', (req, res) => {
  // Extract the username and password submitted in the request body from the
  // client.
  const { username, password } = req.body;
  const expectedUsername = config.get('username');
  const expectedPassword = config.get('password');

  // If the username and password are both present, and both match the values
  // we have configured, we can log the user in. If not, we can respond with an
  // error. In our simplistic example a user is said to be logged in based on
  // the presence of a cookie.
  if (username === expectedUsername && password === expectedPassword) {
    res.cookie('accessToken', crypto.randomBytes(16).toString('hex'), {
      http: true,
    });

    return res.format({
      html: () => void res.redirect('/dashboard'),
      json: () => void res.status(200).json({
        success: true,
      }),
    });
  }

  const data = {
    message: 'The username or password you entered was incorrect',
  };

  return res.format({
    html: () => void res.status(401).render('login', data),
    json: () => void res.status(401).json(data),
  });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  return res.status(200).render('dashboard');
});

// Start the server.
const server = app.listen(config.get('port'), () => {

  const { port } = server.address();
  console.log(`Server running on port ${port}`);
});
