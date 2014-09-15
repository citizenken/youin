/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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

