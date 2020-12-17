var Point = require("../models/Point");
var Q = require("q");
var deferred;

const setPoint = (req) => {
  deferred = Q.defer();
  let point = new Point({
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    zone: req.body.zone,
  });
  point
    .save()
    .then((result) => {
      deferred.resolve(result);
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};
const findByZoneId = (req, res) => {
  deferred = Q.defer();
  Point.find({ zone: req.params.zoneId })
  .select('_id longitude latitude')
  .populate('zone', 'name')
  .then(result => { deferred.resolve(result) })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;

};
module.exports = { setPoint, findByZoneId };
