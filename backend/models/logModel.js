const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogSchema = new Schema({
  type: {type: String, enum: ['request', 'notice', 'dispute'], required: true},
  comment: {type: String, required: true},
  songId: {type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true},
}, {timestamps: true})

module.exports = mongoose.model('Log', LogSchema);