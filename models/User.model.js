const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 60
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    max: 512
  }
});

module.exports = mongoose.model('User', userSchema);
