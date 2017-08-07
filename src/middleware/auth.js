// Middleware function to determine whether or not a user is logged in. In our
// simplistic example a user is logged in if they have an "accessToken" cookie
// regardless of its value. If the user is not logged in we redirect to the
// login page.
module.exports = function isAuthenticated(req, res, next) {
  if (!req.cookies.accessToken) {
    return res.redirect('/');
  }

  return next();
}

