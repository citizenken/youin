/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  console.log(req.session)
  var is_auth = req.isAuthenticated()
  console.log(is_auth)
  if (is_auth) return next();
  // User is not allowed
  else return res.send("There was an error logging you in");
};