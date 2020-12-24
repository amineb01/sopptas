var Point = require("../models/Point");
var Zone = require("../models/Zone");

var Q = require("q");
var deferred;

const setPoint = (req) => {
  deferred = Q.defer();
  let point = new Point({
    location: {
      type: "Point",
      coordinates: [req.body.longitude,req.body.latitude]
     },
    name: req.body.name,
    zone: req.body.zone,
  });
  point
    .save()
    .then((result) => {
      req.params._id = result._id
      addPointToZone(req).then(res=>
        // console.log(req.body.zone,result)
        
        deferred.resolve(result)
      ).catch((error) => {
        deferred.reject(error.message);
      });
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

const addPointToZone = (req) => {
  deferredPoint = Q.defer();
  Zone.findById(req.body.zone)
  .then(zone => { 
    if (zone) {
      zone.points.push(req.params._id);
      zone.save().then(zone => { 
        deferredPoint.resolve('success') 
      }).catch(error => {
        removePointId(req)
        .then(res=> deferredPoint.reject(error.message))
        .catch(error => {
          deferred.reject(error.message);
        })
      })
    }else{
      removePointId(req)
      .then(res=> deferredPoint.reject(error.message))
      .catch(error => {
        deferred.reject('zone not found ');
      })
    }
  })
  .catch(error => {
    removePointId(req)
    .then(res=> deferredPoint.reject(error.message))
    .catch(error => {
      deferred.reject(error.message);
    })
  })
  return deferredPoint.promise;

};




const removePointId = (req, res) => {
  deferredRemovePoint = Q.defer();
  Point.remove({ _id: req.params._id }, function(err) {
    if (!err) {
      deferredRemovePoint.resolve('success');
    }
    else {
      deferredRemovePoint.reject(err.message);
    }
  });

  return deferredRemovePoint.promise;

};



const findByZoneId = (req, res) => {
  deferred = Q.defer();
  Point.find({ zone: req.params.zoneId })
  .select('_id location name')
  .populate('zone', 'name')
  .then(result => { deferred.resolve(result) })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;

};

const findNearestPointZone = (req, res) => {
  deferred = Q.defer();
  Point.find({
    "location": {
      $near: {
        $geometry: {
           type: "Point" ,
           coordinates: [ req.params.latitude , req.params.longitude ]
        },
      }
    }
 })
 .limit(1)
 .select('_id ')
 .populate({path:'zone ',populate: { path: 'points', model: 'Point', select: 'name location' }})
 .then(result => { deferred.resolve(result) })
 .catch(error => {
   deferred.reject(error.message);
 })
  
  return deferred.promise;

};




module.exports = { setPoint, findByZoneId, findNearestPointZone };
