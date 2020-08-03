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
  genre: {
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
  },
  image: String,
  imageId: String,
  rating: Number,
  description: String,
  cost: Number
});

module.exports = mongoose.model('Bars', schema);
