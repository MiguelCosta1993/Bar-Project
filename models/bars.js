'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'Rooftop-Bar',
      'Sports-Bar',
      'Club-Bar',
      'Hotel-Bar',
      'Cocktail-Bar',
      'Platic-Bar'
    ]
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  }
});

module.exports = mongoose.model('Bars', schema);
