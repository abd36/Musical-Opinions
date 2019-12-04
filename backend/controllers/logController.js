const Log = require("../models/logModel");

//create func
exports.create = (req, res) => {
  //create new model with var that was passed in the request
  let log = new Log({
    type: req.body.type,
    comment: req.body.comment,
    songId: req.body.songId
  });
  //save the new model
  log.save(function(err, log) {
    if(err) res.send({ error: err });
    else res.send(log);
  });
};

//get func
exports.getAll = (req, res) => {
  Log.find({}, function(err, logs) {
    if (err) res.send({ error: err });
    else res.send(logs);
  });
};