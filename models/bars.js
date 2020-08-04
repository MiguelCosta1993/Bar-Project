'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  genre: {
    type: String,
    enum: [
      'Rooftop-Bar',
      'Sports-Bar',
      'Club-Bar',
      'Hotel-Bar',
      'Cocktail-Bar',
      'Plastic-Bar'
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
  },
  image: String,
  rating: Number,
  description: String,
  cost: Number
});

module.exports = mongoose.model('Bars', schema);
