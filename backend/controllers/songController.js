const mongoose = require("mongoose");
const Song = require("../models/songModel");
const Fuse = require("fuse.js");

exports.search = function(req, res) {
  //filter by hidden and copyRightString attributes
  Song.find({ hidden: false, copyRightStrike: false }, function(err, songs) {
    if (err) res.send({ error: err });
    else {
      //use Fuse.js for soft-search functionality
      res.send(new Fuse(songs, {
        shouldSort: true,
        tokenize: true,
        threshold: 0.3,
        location: 0,
        distance: 30,
        maxPatternLength: 30,
        minMatchCharLength: 1,
        keys: ["title", "artist", "comment", "genre", "year", "track"]
      }).search(req.params.query));
    }
  });
};

exports.all = function(req, res){
  Song.find({}, function(err, songs) {
    if(err) {
      res.send({ error: err } )
    }
    else {
      res.send(songs);
    }
  })
}

exports.allButHidden = function(req, res){
  //filter by hidden and copyRightString attributes
  Song.find({ hidden: false, copyRightStrike: false }, {}, {}, function(err, songs) {
    if(err) {
      res.send({ error: err } )
    }
    else {
      res.send(songs);
    }
  })
}

exports.create = function(req, res) {
  //create new model with json in the request
  let song = new Song({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    comment: req.body.comment,
    genre: req.body.genre,
    track: req.body.track,
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
  //filter by hidden and copyRightString attributes
  //and sort by average rating in descending order
  Song.find({ hidden: false, copyRightStrike: false }, {}, { sort: { averageRating: -1 } }, function(err, songs) {
    if (err) {
      res.send("can't find songs - " + err);
    } else {
      res.send(songs.slice(0, 10));
    }
  });
};

exports.toggleHide = function(req, res) {
  let id = req.params.id;
  //find song by using song id in the url
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
  //find song by using song id in the url
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