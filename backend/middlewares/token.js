var jwt = require('jsonwebtoken');
var Q = require('q');
var deferred

const generateToken = (req, res) => {
  deferred = Q.defer();
  try {
    var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60 *24),
                         data:{ role: req.body.role || 'citizen', email: req.body.email, id: req.body.id  }},
                         process.env.privateKey);

    deferred.resolve( token);
  } catch (e) {
    deferred.reject(e);
  }

  return deferred.promise;
}


const verifyToken = (req, res) => {
  deferred = Q.defer();
  let token = req.headers.token
  if (!token) {
    deferred.reject('token is required');
  } else {
    var decoded = jwt.verify(token, process.env.privateKey, function(err, decoded) {
      if (decoded) {
        deferred.resolve( decoded.data );
      } else {
        deferred.reject('token is invalid');
      }
    });

  }
  return deferred.promise;
}

const isCollaboratorToken = (req, res) => {
  deferred = Q.defer();
  if (req.headers.role && (req.headers.role == "admin" || req.headers.role == "restricted")){
    deferred.resolve( req.headers.role );
  }else{
    deferred.reject("token is invalid you but is not collaborator token   ");
  }

  return deferred.promise;
}


const isAdminToken = (req, res) => {
  deferred = Q.defer();
  if ( req.headers.role && req.headers.role == "admin" ){
    deferred.resolve( req.headers.role );
  }else{
    deferred.reject("token is invalid you but is not admin token ");
  }

  return deferred.promise;
}


module.exports = {verifyToken, generateToken, isCollaboratorToken, isAdminToken};
