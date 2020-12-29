var User = require('../models/User')
var Q = require('q');
var deferred

const getUsers = (req, res) => {
  deferred = Q.defer();
  User.find()
  .select('_id name email role')
  .then(users => {
    deferred.resolve( {
       users,
       count: users.length
     });
   })
    .catch(error => {
      deferred.reject(error);
    })
  return deferred.promise;
}

const sendNotif = (req, res) => {
  console.log(req.params.idPoint)
  deferred = Q.defer();
  User.find({"points._id": req.params.idPoint} )
  .select('_id ')
  .then(users => {
    deferred.resolve(users);
   })
    .catch(error => {
      deferred.reject(error);
    })
  return deferred.promise;
}

const setUser = (req, res) => {
  deferred = Q.defer();
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    user.save()
    .then(result => {
      deferred.resolve(result)
    })
    .catch(error => {
      deferred.reject(error.message);
    })

  return deferred.promise;
}

const addPointToUser = (req, res) => {
  const conditions = {
    _id: req.headers.id,
    'points._id': { $ne: req.body.id }
  };
  const update = {
      $addToSet: { points: { _id:req.body.id } }
  }

  deferred = Q.defer();
  User.updateOne( 
    conditions,
    update, 
    { multi: true }, (err, result) =>{
      if (err) {
        deferred.reject(err.message);
      } else {
        deferred.resolve(result) 
      }
    }
  );
  return deferred.promise;

};

const removePointFromUser = (req, res) => {
  console.log(req.headers.id)

  console.log(req.params.id)
  const conditions = {
    _id: req.headers.id,
    'points._id': { $eq: req.params.id }
  };
  const update = {
      $pull: { points: { _id:req.params.id } }
  }

  deferred = Q.defer();
  User.updateOne( 
    conditions,
    update, 
    { multi: true }, (err, result) =>{
      if (err) {
        deferred.reject(err.message);
      } else {
        deferred.resolve(result) 
      }
    }
  );
  return deferred.promise;


};






module.exports = { getUsers, setUser, addPointToUser, removePointFromUser, sendNotif }
