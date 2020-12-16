var express = require('express');

const reclamations = require('../controllers/reclamations')(express)
const users = require('../controllers/users')(express)
const points = require('../controllers/points')(express)
const zones = require('../controllers/zones')(express)



const router = (app) => {
  app.use('/reclamations', reclamations);
  app.use('/users', users);
  app.use('/points', points);
  app.use('/zones', zones);

  return app;
}


module.exports = router;
