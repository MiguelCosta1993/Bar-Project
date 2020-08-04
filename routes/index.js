'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/creators', (req, res, next) => {
  res.render('creators');
});

module.exports = router;
