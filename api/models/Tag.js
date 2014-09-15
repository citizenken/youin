/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var addcount

module.exports = {

  attributes: {
    tagName : { type: 'string', unique: true, required: true },
    taggedEvents : { collection: 'event', via: 'tags' },
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
      if (err) return mainCb(err);
      // Update the event with the new tags
      Event.update({id: eventId}, {tags: tagRecords}).exec(function(err, results) {
        if (err) return mainCb(err);
        mainCb();
      });
    });
    
  }
};

