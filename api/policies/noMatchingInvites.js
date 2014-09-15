module.exports = function (req, res, next) {
  var values = req.body;
  
  Invitation.find()
    .where({ userID: values.userID, eventID: values.eventID })
    .exec(function(err, invites){
      if (err) res.send("There was an error looking for existing invitations");
      console.log(invites)
      if (invites.length > 0) res.send("You can only have one invite per event");
      next()
  })
};