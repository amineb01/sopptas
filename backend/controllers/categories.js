var Category = require("../models/Category");

var {
  setCategory,
  getCategories,
  getCategoryById,
  update,
  deleteCategory,
} = require("../middlewares/categories");
var { verifyToken, isCollaboratorToken } = require("../middlewares/token");

const CategoryController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log(
      "Time to access Categorys route: ",
      new Date().toLocaleDateString("en-US")
    );
    next();
  });

  router.post(
    "/",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },
    function (req, res, next) {
      setCategory(req)
        .then((result) => {
          return res.status(200).json({
            result: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  router.get(
    "/:id",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },
    function (req, res, next) {
      getCategoryById(req)
        .then((result) => {
          return res.status(200).json({
            result: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  router.get(
    "/",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },
    function (req, res, next) {
      getCategories(req)
        .then((result) => {
          return res.status(200).json({
            result: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  router.put(
    "/:id",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },
    function (req, res, next) {
      update(req)
        .then((result) => {
          return res.status(200).json({
            result: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  router.delete(
    "/:id",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },
    function (req, res, next) {
      deleteCategory(req)
        .then((result) => {
          return res.status(200).json({
            result: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );
  return router;
};

module.exports = CategoryController;
