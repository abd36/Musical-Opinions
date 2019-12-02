const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DMCATakeDownSchema = new Schema({
  dmca: {type: String, required: true},
  takeDown: {type: String, required: true}
  }, {timestamps: true})

module.exports = mongoose.model('DMCATakeDown', DMCATakeDownSchema);