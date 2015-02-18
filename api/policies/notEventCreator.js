module.exports = function (req, res, next) {
  Event.findOne(req.body.eventId, function(err, event){
    if (err) return res.send('There was an error finding your event', 403);
    if (!event) return res.send('Event was not found', 403);
    if (req.user.id == event.creator) return res.send('Can\'t create an invitation to an event you created', 403);
    req.body.userId = req.user.id
    return next();
  })
};