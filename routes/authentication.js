'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { name, email, password,bio, adminCode, image } = req.body;
  const adminMatch = process.env.ADMIN_CODE;

  let isAdmin = false;
  if (adminCode === adminMatch) {
    isAdmin = true;
  }
  console.log(isAdmin);

  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        bio,
        passwordHash: hash,
        isAdmin,
        image
      });
    })
    .then(user => {
      req.session.user = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
