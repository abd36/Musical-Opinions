const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, max: 40},
    artist: {type: String, required: true, max: 40},
    album: {type: String, max: 40, default: "Unkown"},
    comment: {type: String, max: 40, default: 'Unknown'},
    genre: {type: String, max: 40, default: "Unkown"},
    year: {type: String, max: 4, default: "2019"},
    track: {type: Number, default: 0},
    averageRating: {type: Number, default: 0},
    sumOfRatings: {type: Number, default: 0},
    numberOfRatings: {type: Number, default: 0},
    hidden: {type: Boolean, default: false},
    copyRightStrike: {type: Boolean, default: false}
  });

module.exports = mongoose.model('Song', SongSchema);