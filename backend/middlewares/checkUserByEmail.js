var User = require('../models/User')
var Q = require('q');

const checkUserByEmail = ( req, res ) => {


  var deferred = Q.defer();
  User.findOne({
      email: req.body.email
    })
    .select('email name password role')
    .exec()
    .then(user => {
      if(!user){
        deferred.reject("user not found");
      }else{
        console.log(user)
        req.body.cryptedPassword = user.password
        req.body.id = user._id
        req.body.role = user.role
        req.body.name = user.name
        deferred.resolve()
      }

    })
    .catch(error => {
      deferred.reject(error);
    })

    return deferred.promise;

}


module.exports = checkUserByEmail;
