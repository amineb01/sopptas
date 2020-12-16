var Reclamation = require('../models/Reclamation')
var Q = require('q');
var deferred

const getReclamations = (req, res) => {
  deferred = Q.defer();
  Reclamation.find({ user: req.headers.id })
  .select('_id title body user_id ')
  .populate('user', 'name')
  .then(results => {
    deferred.resolve( {
       reclamations: results,
       count: results.length
     });
 })
  .catch(error => {
    deferred.reject(error);
  })
    return deferred.promise;
}

const setReclamation = (req, res) => {
  deferred = Q.defer();
  let reclamation = new Reclamation({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user,
    image: req.file.path,
  })

  reclamation.save()
      .then(result => {
        deferred.resolve(result)
      })
      .catch(error => {
        deferred.reject(error.message);
      })

  return deferred.promise;
}

const getOneReclamation = (req, res) => {
  deferred = Q.defer();

  Reclamation.findById(req.params.id)
  .then(result => {    deferred.resolve(result) })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;
}

module.exports = {getReclamations, setReclamation, getOneReclamation}
