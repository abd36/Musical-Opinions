const Log = require("../models/logModel");

exports.create = (req, res) => {
  let log = new Log({
    type: req.body.type,
    comment: req.body.comment,
    songId: req.body.songId
  });

  log.save(function(err, log) {
    if(err) res.send({ error: err });
    else res.send(log);
  });
};

exports.getAll = (req, res) => {
  Log.find({}, function(err, logs) {
    if (err) res.send({ error: err });
    else res.send(logs);
  });
};