module.exports = function (req, res, next) {
  var path = req.route.path;
  var method = req.route.method;
  var values = req.body;
  
  console.log(req.session)
  Event.findOneById(values.eventID, function(err, event){
    if (err) res.send('There was an error finding your event', 403);
    if (method === 'post') {
      switch (target) {
        case '/invitation/create':
          if (event.creator === values.userID) res.send('Can\'t create an invitation to an event you created', 403);
          break;
        case '/event/create':
          if (event.creator === values.userID) {
            next()
          } else {
            res.send('Permission denied', 403);
          }
          break;        
      }
    } 

    
    

    next();
  })
};