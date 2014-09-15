/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var geocoder = require('node-geocoder').getGeocoder('openstreetmap', 'http');//, {apiKey: 'YOUR_API_KEY', formatter: null});
var tags

module.exports = {

  attributes: {
    title : { type: 'string', required: true },
    description : { type: 'string', required: true },
    location : { type: 'string', required: true },
    maxMembers : { type: 'integer', required: true },
    currentMembers : { collection: 'user', via: 'eventsAttending', dominant: true },
    creator : { model: 'user', required: true },
    invitations : { collection: 'invitation', via: 'eventID' },
    tags : { collection: 'tag', via: 'taggedEvents', dominant: true },
    lat : { type: 'float' },
    lon : { type: 'float' },
  },

  beforeCreate: function(values, next) {
    tags = values.eventTags
    delete values.eventTags

    geocoder.geocode(values.location, function ( err, data ) {
      if (err || data.length === 0) return next('There was an error geocoding. Please verify your address.');
      var geometry = data[0]
      values.lat = geometry.latitude
      values.lon = geometry.longitude
      next();
    })
  },

  getTagIds : function(tags, callback) {
    async.map(tags, function(tag, cb) {
      Tag.findOrCreate({tagName: tag}, {tagName: tag}, cb);
    }, function done (err, tagRecords) {
      if (err) callback(err);
      callback(tagRecords)
    });
  },

  modifyTags: function (tags, eventId, mainCb) {

    // Asynchronously transform the `tags` array into an array of Tag records
    async.map(tags, function(tag, cb) {
      // For each tag, find or create a new record.
      // Since the async.map `cb` argument expects a function with 
      // the standard (error, result) node signature, this will add
      // the new (or existing) Tag instance to the resulting array.
      // If an error occurs, async.map will exit early and call the
      // "done()" function below
      Tag.findOrCreate({tagName: tag}, {tagName: tag}, cb);
    }, function done (err, tagRecords) {
      if (err) {return mainCb(err);}
      // Update the event with the new tags
      Event.update({id: eventId}, {tags: tagRecords}).exec(mainCb);
    });

  },  

  beforeUpdate: function(values, next) {
    console.log('blah', values)
    next();
  },

//   afterUpdate: function(record, next) {
//     if (tags) {
//       console.log('blah', tags)
//       Tag.modifyTags(tags, record.id, next) 
//     }
//     next();
//   },

  afterCreate : function(record, next) {
    Event.modifyTags(tags, record.id, function() {
        next()
    });
   }

  // afterCreate : function(record, next) {
  //   Event.getTagIds(tags, function(tagRecords) {
  //     Event.update({id: record.id}, {tags: tagRecords}).exec(function (err, update) {
  //       next()
  //     })      
  //   });
  //  }
};

