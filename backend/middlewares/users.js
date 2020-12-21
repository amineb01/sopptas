var User = require('../models/User')
var Q = require('q');
var deferred

const getUsers = (req, res) => {
  deferred = Q.defer();
  User.find()
  .select('_id name email')
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

const addAdmin = (req, res) => {
  deferred = Q.defer();
    User.find()
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "admin",
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

const update = (req, res) => {
  deferred = Q.defer();
  if (Object.keys(req.body).length === 0) {
    deferred.reject("Data to update can not be empty!");
    return deferred.promise;
  }
  User.findByIdAndUpdate(req.params.id, req.body,{ runValidators: true, context: 'query' },function(err) {
    deferred.reject("email exist please choose an other email")
})
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
const deleteUser = (req, res) => {
  const id = req.params.id;
  deferred = Q.defer();
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        deferred.reject(
          "Cannot delete User with id= " +req.params.id +" Maybe User was not found!"
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



module.exports = { getUsers, setUser,addAdmin, update, deleteUser }
