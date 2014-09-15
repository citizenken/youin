/**
 * InvitationController
 *
 * @description :: Server-side logic for managing invitations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  status: function(req, res) {
    var id = req.params.id
    var critera = req.body

    if (!_.isEmpty(critera)) {
      Invitation.update(id, critera, function(err, result){
        res.json(result);
      });
      
      
      
      
    } else {
        
    }
    
  }
};

