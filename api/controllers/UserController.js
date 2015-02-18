/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    User.create(req.body).exec(function(err, user) {
      if (err) return res.send(err)
      req.logIn(user, function(err) {
        if (err) return res.send(err);
        var loginResult = {status: 0, message: 'Logged In Successfully'};
        return res.send({'user': user, 'login': loginResult});
      });
    })
  },

  findOne: function(req, res) {
    var sessionId = req.session.passport.user
    User.findOne(req.params.id).exec(function(err, user) {
      if (err) return res.send(err)
      console.log(sessionId === user.id)
      if (sessionId === user.id) return res.send(user)
      var propertiesToOmit = ['email', 'firstName', 'lastName', 'phoneNumber', 'invitesSent', 'lastInviteSent', 'eventInvitations', 'isActive']
      return res.send(_.omit(user, propertiesToOmit))
    })
  },

  view: function(req, res) {
    res.view()
  },

	invitations: function(req,res) {
    var where = req.param('where');

    if (where === undefined) {
      Invitation.find().where({userID: req.params.id})
        .populate('eventID')
      .exec(function(err,invites) {
        res.json(invites);
      });
    } else {

      if (_.isString(where)) {
              where = JSON.parse(where);
      }

      //Set the id in the where clause, along with the other vals the user passed in
      where.userID = req.params.id;
      console.log(where)
      var options = {
                  limit: req.param('limit') || undefined,
                  skip: req.param('skip')  || undefined,
                  sort: req.param('sort') || undefined,
                  where: where || undefined
          };

      console.log("This is the options", options);
      Invitation.find().where(options.where)
        .populate('eventID')
      .exec(function(err, invitations) {
        res.json(invitations);
      })
    }

  }
};

