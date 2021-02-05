var User = require('../models/User')
var Q = require('q');
var deferred
var { generatePassword } = require('../middlewares/password')

const getUsers = (req, res) => {

  var length = 0
  User.count({}, function(err, count){
    length = count
  });
  
  deferred = Q.defer();
  User.find()
  .select('_id name email role')
  .limit(req.query._limit * 1)
  .skip(((req.query._start * 1) - 1) * (req.query._limit * 1))
  // .populate("zone","name")
  .then(users => {
    deferred.resolve( {
       users,
       count: length
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
  console.log(req.body.zone)
  deferred = Q.defer();
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // zone: req.body.zone,
      role: req.body.role
    })
    console.log(user)
    user.save()
    .then(result => {
      req.body.id = result._id
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

const deleteUser = (req, res) => {
  const id = req.params.id;
  deferred = Q.defer();
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        deferred.reject(
          "Cannot delete user with id= " +req.params.id +" Maybe User was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "User was deleted successfully." });
      }
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
  if (req.body.password != "" ) {
    generatePassword(req, res)

  }
  User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then((result) => {
      if (!result) {
        deferred.reject(
          "Cannot update User with id= " +
            req.params.id +
            " Maybe User was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "User was updated successfully." });
      }
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};


const getUsersByPoint = (req) =>{
  deferred = Q.defer();

  const conditions = {
    'points._id': { $in: req.params.id }
  };

  User.find(conditions).then(res=>{
    deferred.resolve(res)
  }).catch(err=>{
    deferred.reject(err)
  })
  return deferred.promise
} 


module.exports = { getUsers, setUser, addPointToUser, removePointFromUser, sendNotif, deleteUser, update, getUsersByPoint }
