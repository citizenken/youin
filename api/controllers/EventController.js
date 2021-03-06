/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  invitations: function(req,res) {
    var where = req.param('where');
    
    if (where === undefined) {
      Invitation.find().where({eventID: req.params.id}).populate('userID').exec(function(err,invites) {
        res.json(invites);
      });
    } else {

      if (_.isString(where)) {
              where = JSON.parse(where);
      }

      //Set the id in the where clause, along with the other vals the user passed in
      where.eventID = req.params.id;
      console.log(where)
      var options = {
                  limit: req.param('limit') || undefined,
                  skip: req.param('skip')  || undefined,
                  sort: req.param('sort') || undefined,
                  where: where || undefined
          };

      console.log("This is the options", options);
      Invitation.find()
        .where(options.where)
        .populate('userID')
      .exec(function(err, invitations) {
        res.json(invitations);
      })
    }

  },
  
  nearby: function(req, res) {
    var coordinates = req.body.coords,
    radius = req.body.radius,
    boundingBox = nearby.boundingBox(coordinates, radius),
    latWhereClause = {lat: { '>=' : boundingBox.lowLat, '<=' : boundingBox.highLat}},
    lonWhereClause = {lon: { '>=' : boundingBox.lowLon, '<=' : boundingBox.highLon}}
    
    Event.find()
      .where(latWhereClause)
      .where(lonWhereClause)
    .exec(function(error, result) {
      res.json(result)
    });
  }
};

