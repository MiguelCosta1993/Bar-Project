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

//BAR CREATE
barRouter.get('/create', routeGuard, (req, res, next) => {
  const user = req.session.user;
  console.log(res.locals.user);
  res.render('bars/create');
});

barRouter.post(
  '/create',
  upload.single('image'),
  routeGuard,
  (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    const barType = req.body.barType;
    const latitude = parseFloat(Number(req.body.latitude));
    const longitude = parseFloat(Number(req.body.longitude));
    const image = req.file.path;
    const rating = parseFloat(Number(req.body.rating));
    const description = req.body.description;
    const cost = parseFloat(Number(req.body.cost));

    Bar.create({
      name,
      address,
      barType,
      location: { coordinates: [latitude, longitude] },
      image,
      rating,
      description,
      cost
    })
      .then(() => {
        res.redirect('/bar/create');
      })
      .catch(err => {
        next(err);
      });
  }
);

//BAR LIST
barRouter.get('/barlist', (req, res, next) => {
  Bar.find()
    .then(bars => {
      res.render('bars/barlist', { bars });
    })
    .catch(err => {
      next(err);
    });
});

barRouter.get('/barfilter', (req, res, next) => {
  const token = req.query.token;
  Bar.find({ barType: token })
    .then(bars => {
      res.render('bars/barfilter', { bars });
    })
    .catch(err => {
      next(err);
    });
});

barRouter.post('/barfilter', (req, res, next) => {
  const { barType } = req.body;

  Bar.find({ barType: barType })
    .then(bars => {
      console.log(bars);
      res.redirect(`/bar/barfilter?token=${barType}`);
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

//BARMAP
barRouter.get('/barmap', (req, res, next) => {
  Bar.find()
    .then(bars => {
      res.render('bars/barmap', { bars });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = barRouter;
