const express = require('express');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

const profileRouter = new express.Router();

profileRouter.get('/display', (req, res, next) => {
  res.render('profile/display');
});

profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile/edit');
});

profileRouter.post(
  '/edit',
  routeGuard,
  upload.single('image'),

  (req, res, next) => {
    const id = req.session.user;
    const { name, email, bio } = req.body;
    const image = req.file.path;
    console.log(id);

    User.findByIdAndUpdate(id, { name, email, image, bio })
      .then(() => {
        res.redirect('/profile/display');
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = profileRouter;
