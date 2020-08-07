'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

// router.get('/display', (req, res, next) => {
//   res.render('profile/display');
// });

router.get('/creators', (req, res, next) => {
  res.render('creators');
});

module.exports = router;
