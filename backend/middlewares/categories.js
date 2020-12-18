var Category = require("../models/Category");
var Q = require("q");
var deferred;

const setCategory = (req) => {
  deferred = Q.defer();
  let category = new Category({
    name: req.body.name,
  });
  category
    .save()
    .then((result) => {
      deferred.resolve(result);
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

const getCategories = (req) => {
  deferred = Q.defer();
  Category.find()
    .select("_id name points")
    .then((categories) => {
      deferred.resolve({
        categories,
        count: categories.length,
      });
    })
    .catch((error) => {
      deferred.reject(error);
    });
  return deferred.promise;
};

const getCategoryById = (req, res) => {
  deferred = Q.defer();
  Category.findById(req.params.id)
    .then((result) => {
      deferred.resolve(result);
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
  Category.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then((result) => {
      if (!result) {
        deferred.reject(
          "Cannot update Category with id= " +
            req.params.id +
            " Maybe Category was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "Category was updated successfully." });
      }
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};
const deleteCategory = (req, res) => {
  const id = req.params.id;
  deferred = Q.defer();
  Category.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        deferred.reject(
          "Cannot delete Category with id= " +req.params.id +" Maybe Category was not found!"
        );
        return deferred.promise;
      } else {
        deferred.resolve({ message: "Category was deleted successfully." });
      }
    })
    .catch((error) => {
      deferred.reject(error.message);
    });
  return deferred.promise;
};

module.exports = { setCategory, getCategories, getCategoryById, update, deleteCategory };
