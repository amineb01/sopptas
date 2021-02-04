var Point = require("../models/Point");
var Zone = require("../models/Zone");

var Q = require("q");
var deferred;

const setPoint = (p, req) => {
  deferred = Q.defer();

  let point = new Point({
    location: {
      type: "Point",
      coordinates: [p.longitude, p.latitude]
     },
    number: p.number,
    zone: p.zone,
  });
  point
    .save()
    .then((result) => {
      deferred.resolve(result)
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

const addPoints = (req) =>{
  var msg = false
  deferred = Q.defer();
  req.body.points.forEach(element => {
    setPoint(element, req)
    .then(res =>{
      msg = true
    })
    .catch((error) => {

      deferred.reject(error.message);
    });
  });
  if (msg) {
    deferred.resolve(req.points)
  }
  return deferred.promise;
}

// const addPointToZone = (req, point) => {
//   deferredPoint = Q.defer();
//   console.log("point" + point.zone)

//   Zone.findById(point.zone)
//   .then(zone => { 
//     if (zone) {
//       zone.points.push(req.params._id);
//       zone.save().then(zone => { 
//         deferredPoint.resolve('success') 
//       }).catch(error => {
//         removePointId(req)
//         .then(res=> deferredPoint.reject(error.message))
//         .catch(error => {
//           deferred.reject(error.message);
//         })
//       })
//     }else{
//       removePointId(req)
//       .then(res=> deferredPoint.reject(error.message))
//       .catch(error => {
//         deferred.reject('zone not found ');
//       })
//     }
//   })
//   .catch(error => {
//     removePointId(req)
//     .then(res=> deferredPoint.reject(error.message))
//     .catch(error => {
//       deferred.reject(error.message);
//     })
//   })
//   return deferredPoint.promise;

// };




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
  console.log(req.params.zoneId)
  Point.find({ zone: req.params.zoneId })
  .select('_id location number')
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
 .populate({path:'zone ',populate: { path: 'points', model: 'Point', select: 'number location' }})
 .then(result => { deferred.resolve(result) })
 .catch(error => {
   deferred.reject(error.message);
 })
  
  return deferred.promise;

};

const findAll = (req, res) => {
  deferred = Q.defer();
  Point.find()
  .then(result => { deferred.resolve(result) })
  .catch(error => {
    deferred.reject(error.message);
  })
    
  return deferred.promise;

};

const getByRadius = (req) =>
{
  deferred = Q.defer();
  Point.find({
    location: {
      $near: {
        $maxDistance: 400,
        $geometry: {
          type: "Point",
          coordinates: [req.params.longitude, req.params.latitude]
        }
      }
    }
 })
 
 .select('_id location number')
 .then(result => { 

  deferred.resolve(result) })
 .catch(error => {
  console.log("seif err")

   deferred.reject(error.message);
 })
  
  return deferred.promise;


}




module.exports = { setPoint, findByZoneId, findNearestPointZone, findAll, addPoints, getByRadius };
