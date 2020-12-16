var Zone = require('../models/Zone')
var Q = require('q');
var deferred

const setZone = (req) => {
  deferred = Q.defer();
  let zone = new Zone({
    name: req.body.name,
  })
  zone.save()
  .then(result => {
    deferred.resolve(result)
  })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;
}

const getZones = (req) => {
  deferred = Q.defer();
  Zone.find()
  .select('_id name')
  .then(zones => {
    deferred.resolve( {
       zones,
       count: zones.length
     });
   })
    .catch(error => {
      deferred.reject(error);
    })
  return deferred.promise;
}

const getOneZone = (req, res) => {
  deferred = Q.defer();
  Zone.findById(req.params.id)
  .then(result => { deferred.resolve(result) })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;
}

module.exports = { setZone, getZones, getOneZone }
