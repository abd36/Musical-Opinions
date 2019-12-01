const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
})

module.exports = mongoose.model('User', UserSchema);