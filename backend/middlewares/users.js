var User = require('../models/User')
var Q = require('q');
var deferred
var sendMail = require('../helpers/sendMail')
var { checkPassword, generatePassword } = require('./password')
var adminsdk = require("../helpers/firebase-admin")


const getUsers = (req, res) => {

  var length = 0
  User.count({ name: { $regex: req.query.filter } }, function (err, count) {
    length = count
  });

  deferred = Q.defer();
  User.find({ name: { $regex: req.query.filter } })
    .select('_id name email role')
    .limit(req.query._limit * 1)
    .skip(((req.query._start * 1) - 1) * (req.query._limit * 1))
    // .populate("zone","name")
    .then(users => {
      deferred.resolve({
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
  console.log(req.body.points)
  deferred = Q.defer();
  User.find({ "points._id": { $in: req.body.points } })
    .then(users => {
      users.forEach(element => {
        sendNotifToUser(element, adminsdk)
      })

      //send notif user by user to do 
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
    role: req.body.role,
    device_token: req.body.device_token
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
    $addToSet: { points: { _id: req.body.id } }
  }

  deferred = Q.defer();
  User.updateOne(
    conditions,
    update,
    { multi: true }, (err, result) => {
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
    $pull: { points: { _id: req.params.id } }
  }

  deferred = Q.defer();
  User.updateOne(
    conditions,
    update,
    { multi: true }, (err, result) => {
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
          "Cannot delete user with id= " + req.params.id + " Maybe User was not found!"
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
  if (req.body.password != "") {
    generatePassword(req, res).then(res => {
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

    })

  } else {
    delete req.body.password
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
  }


  return deferred.promise;
};


const getUsersByPoint = (req) => {
  deferred = Q.defer();

  const conditions = {
    'points._id': { $in: req.params.id }
  };

  User.find(conditions).then(res => {
    deferred.resolve(res)
  }).catch(err => {
    deferred.reject(err)
  })
  return deferred.promise
}


const sendForgetPassword = (req) => {
  deferred = Q.defer();

  User.findOne({
    email: req.body.email
  }).then(res => {
    if (!res) {
      deferred.reject(
        "Cannot find User with email= " +
        req.body.email +
        " Maybe User was not found!"
      );
      return deferred.promise;
    } else {
      sendMail(req.body.email).then(result => {
        deferred.resolve(result)
      }).catch(err => {
        deferred.reject(err)
      })
    }
  }).catch(err => {
    deferred.reject(err)
  })
  return deferred.promise
}
const updatePassword = (req) => {
  deferred = Q.defer();
  console.log(req.headers.id)
  User.findOne({
    _id: req.headers.id,
  }).then(res => {
    req.body.cryptedPassword = res.password
    req.body.password = req.body.old_password

    checkPassword(req).then(result => {
      req.body.password = req.body.new_password
      generatePassword(req).then(result => { 
        User.findOneAndUpdate({ _id: req.headers.id }, { password: req.body.password }).then(result => {
          deferred.resolve("password updated successfully")
        }).catch(err => {
          deferred.reject(err)
        })
      }).catch(err => {
        deferred.reject(err)
      })



    }).catch(err => {
      deferred.reject(err)

    })

  }).catch(err => {
    deferred.reject(err)
  })


  return deferred.promise
}

const sendNotifToUser = (user, adminsdk) => {
  console.log(user)
  adminsdk.messaging().sendToDevice(user.device_token, {notification: {    title: "Un agent de propreté sopptas est proche de votre position",   body: "Préparez vos poubelles S.V.P!"   }}, { priority: "high", timeToLive: 60 * 60 * 24  })
      .then( response => {
       
      })
      .catch( error => {
          console.log(error);
      });

}

module.exports = { getUsers, setUser, addPointToUser, removePointFromUser, sendNotif, deleteUser, update, getUsersByPoint, sendForgetPassword, updatePassword }
