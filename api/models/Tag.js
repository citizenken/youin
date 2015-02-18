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
};

