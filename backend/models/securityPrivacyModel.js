const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SecurityPrivacySchema = new Schema({
  security: {type: String, required: true},
  privacy: {type: String, required: true}
  }, {timestamps: true})

module.exports = mongoose.model('SecurityPrivacy', SecurityPrivacySchema);