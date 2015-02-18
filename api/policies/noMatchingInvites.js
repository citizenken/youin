module.exports = function (req, res, next) {
  var values = req.body;

  Invitation.find()
    .where({ userId: values.userId, eventID: values.eventId })
    .exec(function(err, invites){
      if (err) res.send("There was an error looking for existing invitations");
      if (invites.length > 0) res.send("You can only have one invite per event");
      next()
  })
};