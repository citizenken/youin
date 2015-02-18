module.exports = function (req, res, next) {
  Event.findOne(req.params.id, function(err, event){
    if (err) return res.send('There was an error finding your event', 403);
    if (!event) return res.send('Event was not found', 403);
    if (req.user.id !== event.creator) return res.send('Permission denied', 403);
    return next();
  })
};