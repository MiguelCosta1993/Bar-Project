const express = require('express');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

const profileRouter = new express.Router();

profileRouter.get('/display', (req, res, next) => {
  res.render('profile/display');
});

profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile/edit');
});

profileRouter.post('/edit', routeGuard, (req, res, next) => {
  const id = req.session.userId;
  const { name, email, image, bio } = req.body;

  User.findByIdAndUpdate(id, { name, email, image, bio })
    .then(() => {
      res.redirect('/profile/display');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = profileRouter;
