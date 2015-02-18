module.exports = function (req, res, next) {
  var values = req.body;
  User.findOne(values.userId, function(err, user){
    if (err) res.send('There was an error finding your event', 403);
    if (user.invitesSent === 5) res.send('You have already reached your invitation limit of 5 for the day', 403);
    next();
  })
};