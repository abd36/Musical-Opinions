const mongoose = require("mongoose");
const Song = require("../models/songModel");

exports.all = function(req, res){
  Song.find({}, function(err, songs) {
    if(err) {
      res.send({ error: err} )
    }
    else {
      res.send(songs);
    }
  })
}

exports.create = function(req, res) {
  let song = new Song({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    comment: req.body.comment,
    genre: req.body.genre,
    year: req.body.year,
    hidden: req.body.hidden,
    copyRightViolation: req.body.copyRightViolation
  });

  song.save(function(err, song) {
    if (err) {
      res.send({ error: err });
    }
    res.send(song);
  });
};

exports.topTenSongs = function(req, res) {
  Song.find({ hidden: false }, {}, { sort: { averageRating: -1 } }, function(err, songs) {
    if (err) {
      res.send("can't find songs - " + err);
    } else {
      res.send(songs.slice(0, 10));
    }
  });
};

exports.toggleHide = function(req, res) {
  let id = req.params.id;
  Song.findOne({ _id: id }, function(err, song) {
    if (err) {
      res.send({ error: err });
    } else {
      song.hidden = !song.hidden;
      song.save(function(err, toggledSong) {
        if (err) {
          res.send({ error: err });
        } else {
          res.send(toggledSong);
        }
      });
    }
  });
};

exports.toggleCopyRight = function(req, res) {
  let id = req.params.id;
  Song.findOne({ _id: id }, function(err, song) {
    if (err) {
      res.send("can't find song - " + err);
    } else {
      song.copyRightStrike = !song.copyRightStrike;
      song.save(function(err, toggledSong) {
        if (err) {
          res.send("can't save toggled song - ");
        } else {
          res.send(toggledSong);
        }
      });
    }
  });
};