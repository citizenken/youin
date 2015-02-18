module.exports = function (req, res, next) {
  var user = req.user.id
  var targetUser = parseInt(req.params.id)

  if (user === targetUser) next()
  return	res.send('Permission denied', 403);
};