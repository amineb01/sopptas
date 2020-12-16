var Point = require('../models/Point')
var Q = require('q');
var deferred

const setPoint = (req) => {
  deferred = Q.defer();
  let point = new Point({
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  })
  point.save()
  .then(result => {
    deferred.resolve(result)
  })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;
}
module.exports = { setPoint }
