var Reclamation = require('../models/Reclamation')
var Comment = require('../models/Comment')
var Q = require('q');
var deferred
var { verifyToken } = require("../middlewares/token");
var User = require('../models/User')
var { sendNotifToUser } = require('../middlewares/users')
var adminsdk = require("../helpers/firebase-admin")





const getReclamations = (req, res) => {
  deferred = Q.defer();
  if (req.query.cat_id != undefined) {
    reclamations = Reclamation.find({ category: req.query.cat_id })

  } else {
    reclamations = Reclamation.find()
  }
  // Reclamation.find({ user: req.headers.id })
  reclamations.select('_id title body user category image createdAt updatedAt')
    .sort({ 'createdAt': -1 })
    .limit(req.query.limit * 1)
    .skip((req.query.page - 1) * req.query.limit)
    .populate('user', 'category')
    .then(results => {
      deferred.resolve({
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
    image: req.file.filename,
    category: req.body.category,
    location: {
      type: "Point",
      coordinates: [Number.parseFloat(req.body.longitude.replace(',', '.')), Number.parseFloat(req.body.latitude.replace(',', '.'))]
    },
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

const update = (req, res) => {
  deferred = Q.defer();

  if (Object.keys(req.body).length === 0) {
    deferred.reject("Data to update can not be empty!");
    return deferred.promise;
  } else {
    verifyToken(req, res).then(data => {
      var comment;
      Reclamation.findById(req.params.id).then((result_comment) => {
        comment = new Comment({ text: req.body.comment, user: data.id })
        comment.save();
        Reclamation.findByIdAndUpdate(req.params.id, { $addToSet: { comments: { _id: comment._id } } }, { useFindAndModify: false })
          .then((result) => {
            if (!result) {
              deferred.reject(
                "Cannot update Reclamation with id= " +
                req.params.id +
                " Maybe Reclamation was not found!"
              );
              return deferred.promise;
            } else {
              User.findById(result_comment.user).then((user) => { 
                sendNotifToUser(user, adminsdk, "Un agent de propreté sopptas a répondu à votre réclamation", "Sopptas" )

               })
              deferred.resolve({ message: "Reclamation was updated successfully.", data: comment });
            }
          })
          .catch((error) => {
            deferred.reject(error.message);
          });
      })


    })


  }
  return deferred.promise;
};

const getOneReclamation = (req, res) => {
  deferred = Q.defer();

  Reclamation.findById(req.params.id)
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user",
        populate: {
          path: "user",
          model: "User"
        }
      },
    })
    // .populate('comments', '_id text')
    .then(result => { deferred.resolve(result) })
    .catch(error => {
      deferred.reject(error.message);
    })
  return deferred.promise;
}

const removeCommentFromReclamation = (req, res) => {

  deferred = Q.defer();
  Comment.findByIdAndRemove(req.params.id_comment)
    .then((data) => {
      if (!data) {
        deferred.reject(
          "Cannot delete comment with id= " + req.params.id_comment + " Maybe comment was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "comment was deleted successfully." });
      }
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
}

// const getReclamationsByCategory = (req, res) => {
//   deferred = Q.defer();

//   Reclamation.find({category: req.params.id})
//   .then(result => {    deferred.resolve(result) })
//   .catch(error => {
//     deferred.reject(error.message);
//   })
//   return deferred.promise;
// }

module.exports = { getReclamations, setReclamation, getOneReclamation, update, removeCommentFromReclamation }
