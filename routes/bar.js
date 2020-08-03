'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/barlist', (req, res, next) => {
  res.render('barlist');
});

router.get('/barsingle', (req, res, next) => {
  res.render('barsingle');
});

router.get('/barmap', (req, res, next) => {
  res.render('barmap');
});

module.exports = router;
