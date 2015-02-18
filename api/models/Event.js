/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var geocoder = require('node-geocoder').getGeocoder('openstreetmap', 'http');//, {apiKey: 'YOUR_API_KEY', formatter: null});
// var tagIds

module.exports = {

  attributes: {
    title : { type: 'string', required: true },
    description : { type: 'string', required: true },
    location : { type: 'string', required: true },
    maxMembers : { type: 'integer', required: true },
    currentMembers : { collection: 'user', via: 'eventsAttending', dominant: true },
    creator : { model: 'user', required: true },
    invitations : { collection: 'invitation', via: 'eventId' },
    tags : { collection: 'tag', via: 'taggedEvents', dominant: true },
    lat : { type: 'float' },
    lon : { type: 'float' },
  },

  beforeCreate: function(values, next) {
    geocoder.geocode(values.location, function ( err, data ) {
      if (err || data.length === 0) return next('There was an error geocoding. Please verify your address.');
      var geometry = data[0]
      values.lat = geometry.latitude
      values.lon = geometry.longitude
      console.log(values)
      next()
    })

    async.map(values.tags, function(tag, cb) {
      Tag.findOrCreate({tagName: tag}, {tagName: tag}, cb);
    }, function done (err, tagRecords) {
      if (err) next(err);
      values.tags = tagRecords;
      // console.log(values)
    });

    // console.log(values)

      // next();
    // Event.getTagIds(values.tags)
    // console.log(tagIds)

  },

  getTagIds : function(values, next) {
  },

  // modifyTags: function (tags, eventId, mainCb) {
  //   async.map(tags, function(tag, cb) {
  //     Tag.findOrCreate({tagName: tag}, {tagName: tag}, cb);
  //   }, function done (err, tagRecords) {
  //     if (err) {return mainCb(err);}
  //     // Update the event with the new tags
  //     Event.update({id: eventId}, {tags: tagRecords}).exec(mainCb);
  //   });

  // },
};

