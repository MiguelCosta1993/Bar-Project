'use strict';

const express = require('express');
const Bar = require('../models/bars');
const barRouter = new express.Router();
const routeGuard = require('./../middleware/route-guard');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

barRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('bars/create');
});
barRouter.post(
  '/create',
  upload.single('image'),
  routeGuard,
  (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    const genre = req.body.genre;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const image = req.body.image;
    const rating = req.body.rating;
    const description = req.body.description;
    const cost = req.body.cost;

    Bar.create({
      name,
      address,
      genre,
      location: { coordinates: [latitude, longitude] },
      image,
      rating,
      description,
      cost
    })
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        next(err);
      });
  }
);

barRouter.get('/barlist', (req, res, next) => {
  Bar.find()
    .then(bars => {
      res.render('bars/barlist', { bars });
    })
    .catch(err => {
      next(err);
    });
});

barRouter.get('/barsingle/:barId', (req, res, next) => {
  const barId = req.params.barId;
  Bar.findById(barId)
    .then(bar => {
      res.render('bars/barsingle', { bar: bar });
    })
    .catch(err => {
      next(err);
    });
});

barRouter.get('/barmap', (req, res, next) => {
  res.render('barmap');
});

module.exports = barRouter;
