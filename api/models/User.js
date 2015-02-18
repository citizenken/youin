/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {
  schema: true,

  attributes: {
    email : { type: 'string', unique: true, required: true },
    username : { type: 'string', unique: true, required: true },
    password : { type: 'string', required: true, protected: true },
    firstName : { type: 'string' },
    lastName : { type: 'string' },
    phoneNumber : { type: 'integer' },
    invitesSent : { type: 'integer', defaultsTo: 0 },
    lastInviteSent : { type: 'datetime', defaultsTo: null },
    eventsCreated: { collection: "event", via: "creator" },
    eventsAttending: { collection: "event", via: "currentMembers" },
    eventInvitations: { collection: "invitation", via: "userId" },
    isActive: { type: 'boolean', defaultsTo: true, required: true },
    isAdmin: { type: 'boolean', defaultsTo: false, protected: true },
  },

  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
};

