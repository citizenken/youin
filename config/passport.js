/**
* passport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');


module.exports = {
  express: {
    customMiddleware: function(app){
      console.log('Express middleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};