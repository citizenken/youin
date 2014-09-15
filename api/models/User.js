/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    email : { type: 'string', unique: true, required: true },
    firstName : { type: 'string'},
    lastName : { type: 'string'},
    phoneNumber : { type: 'integer'},
    invitesSent : { type: 'integer', defaultsTo: 0 },
    lastInviteSent : { type: 'datetime', defaultsTo: null},
    eventsCreated: { collection: "event", via: "creator" },
    eventsAttending: { collection: "event", via: "currentMembers" },
    invitations: { collection: "invitation", via: "userID" },
    passports : { collection: 'Passport', via: 'user' }
  }
};

