'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  passwordHash: {
    type: String
  },
  isAdmin: {
    type: Boolean, 
    default: false
  },
  image: String,
  bio: String

});

module.exports = mongoose.model('User', schema);
