/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');
module.exports = {
    login: function(req, res) {
      res.view();
    },

    process: function(req, res){
      passport.authenticate('local', function(err, user, info) {
        if (err) return res.send(err);
        // Errors have non-zero statuses
        if (info.status) return res.send(info);

        req.logIn(user, function(err) {
          if (err) return res.send(err);
          return res.send(info);
        });
      })(req, res);
    },

    logout: function (req,res){
     req.logout();
      res.send('logout successful');
    }

};

