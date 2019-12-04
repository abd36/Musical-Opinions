const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, required: true},
  comment: {type: String, max: 100, default: "No comment"},
  songId: {type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true},
  userEmail: {type: String, required: true},
  }, {timestamps: true})

module.exports = mongoose.model('Review', ReviewSchema);