var express = require('express');

const reclamations = require('../controllers/reclamations')(express)
const users = require('../controllers/users')(express)
const points = require('../controllers/points')(express)
const zones = require('../controllers/zones')(express)
const categories = require('../controllers/categories')(express)



const router = (app) => {
  app.use('/api/reclamations', reclamations);
  app.use('/api/users', users);
  app.use('/api/points', points);
  app.use('/api/zones', zones);
  app.use('/api/categories', categories);

  return app;
}


module.exports = router;
