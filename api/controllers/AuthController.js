/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    process: function(req, res){
      console.log(passport)
        passport.authenticate('local', function(err, user, info) {
          if ((err) || (!user)) {
            return res.send({
            message: 'login failed'
            });
            res.send(err);
          }
          req.logIn(user, function(err) {
            if (err) res.send(err);
            return res.send({
              message: 'login successful'
            });
          });
        })(req, res);
      },
};

