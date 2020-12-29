var Zone = require("../models/Zone");
var Q = require("q");
var deferred;

const setZone = (req) => {
  deferred = Q.defer();
  let zone = new Zone({
    name: req.body.name,
  });
  zone
    .save()
    .then((result) => {
      deferred.resolve(result);
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

const getZones = (req) => {
  deferred = Q.defer();
  Zone.find()
    .select("_id name ")
    .then((zones) => {
      deferred.resolve({
        zones,
        count: zones.length,
      });
    })
    .catch((error) => {
      deferred.reject(error);
    });
  return deferred.promise;
};

const getZoneById = (req, res) => {
  deferred = Q.defer();
  Zone.findById(req.params.id)
    .then((result) => {
      deferred.resolve(result);
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

const update = (req, res) => {
  deferred = Q.defer();
  if (Object.keys(req.body).length === 0) {
    deferred.reject("Data to update can not be empty!");
    return deferred.promise;
  }
  Zone.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then((result) => {
      if (!result) {
        deferred.reject(
          "Cannot update Zone with id= " +
            req.params.id +
            " Maybe Zone was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "Zone was updated successfully." });
      }
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};
const deleteZone = (req, res) => {
  const id = req.params.id;
  deferred = Q.defer();
  Zone.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        deferred.reject(
          "Cannot delete Zone with id= " +req.params.id +" Maybe Zone was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "Zone was deleted successfully." });
      }
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

module.exports = { setZone, getZones, getZoneById, update, deleteZone };
