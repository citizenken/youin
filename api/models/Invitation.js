/**
* Invitation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userId : { model: "user", required: true },
    eventId : { model: "event", required: true },
    inviteStatus : { type: 'integer', defaultsTo: 0 },
    acceptDate : { type: 'datetime', defaultsTo: null }
  },

  afterCreate: function(record, next) {
    User.findOne(record.userId, function(err, user) {
      if (err) return next("There was an issue finding a user for this invite");
      var inviteInfo = {};
      inviteInfo.inviteSent = user.inviteSent + 1;
      inviteInfo.lastInviteSent = new Date().toISOString();
      User.update(user.id, inviteInfo, function(err, user) {
        if (err) return next("there was an issue increasing the invites sent")
        next()
      });
    });
  },

  beforeUpdate: function(values, next) {

  },

  afterUpdate: function(record, next) {
    var status = record.inviteStatus
    var event = record.eventID
    var user = record.userId

    if (status === 1) {
      Event.findOne(event).exec(function(err, event){
        event.currentMembers.add(user);
        event.save(function(err) {});
      })
    } else if (status === 2) {
      Event.findOne(event).exec(function(err, event){
        event.currentMembers.remove(user);
        event.save(function(err) {});
      })
    }
    next();
  }
};
