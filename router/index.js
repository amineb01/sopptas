var express = require('express');

const reclamations = require('../controllers/reclamations')(express)
const users = require('../controllers/users')(express)

const router = (app) => {
  app.use('/reclamations', reclamations);
  app.use('/users', users);

  return app;
}


module.exports = router;
