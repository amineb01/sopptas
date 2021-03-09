var User = require('../models/User')
var checkUserByEmail = require('../middlewares/checkUserByEmail')
var { generateToken, verifyToken, isCollaboratorToken, isAdminToken } = require('../middlewares/token')
var { generatePassword, checkPassword } = require('../middlewares/password')


var { setUser, getUsers, addPointToUser, removePointFromUser, sendNotif, deleteUser, update, getUsersByPoint, sendForgetPassword, updatePassword } = require('../middlewares/users')

const userController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time to access users route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/',
    function (req, res, next) {
      getUsers(req, res)
        .then(results => {
          return res.status(201).json({
            message: 'success',
            results,
          });
        })
        .catch(error => {
          return res.status(500).json({
            message: 'An error has occured',
            error: error
          });
        })
        .done()
    });

  router.post('/signup',
    function (req, res, next) {
      generatePassword(req, res)
        .then(() => {
          next()
        })
        .catch(error => {
          return res.status(401).json({
            message: 'An error has occured',
            error: error
          });
        })

    },
    function (req, res, next) {
      setUser(req, res)
        .then(result => next())
        .catch(error => {
          return res.status(401).json({
            message: 'An error has occured0',
            error: error
          });
        })
    },
    function (req, res, next) {
      generateToken(req, res)
        .then(token => {
          return res.status(200).json({
            message: 'user created',
            data: {
              id: req.body.id,
              email: req.body.email,
              name: req.body.name,
              role: req.body.role || "citizen",
            },
            token: token,
          });
        })
        .catch(error => {
          return res.status(401).json({
            message: 'An error has occured',
            error: error
          });
        })
        .done()
    }
  );

  router.post('/signin',
    function (req, res, next) {
      checkUserByEmail(req, res)
        .then(result => next())
        .catch(error => {
          return res.status(200).json({
            message: 'An error has occured',
            error: error
          });
        })

    },
    function (req, res, next) {
      checkPassword(req, res)
        .then(result => next())
        .catch(error => {
          return res.status(401).json({
            message: 'An error has occured',
            error: error
          });
        })
        .done()
    },
    function (req, res, next) {
      generateToken(req, res)
        .then(token => {
          return res.status(201).json({
            message: 'user authenticated',
            data: {
              id: req.body.id,
              email: req.body.email,
              name: req.body.name,
              role: req.body.role,
            },
            token: token
          });
        })
        .catch(error => {
          return res.status(401).json({
            message: 'An error has occured',
            error: error
          });
        })
        .done()
    },
  );

  router.get('/:id',
    (req, res) => {

      User.findById(req.params.id)
        .select("points")
        .populate('points._id')

        .then(result => {
          res.status(201).json({
            message: 'succec',
            data: result
          });
        }

        ).catch(error => {
          res.status(500).json({
            message: 'An error has occured',
            error: error
          });
        })
    })





  router.post(
    "/addPoint",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
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
      addPointToUser(req)
        .then((result) => {
          return res.status(200).json(result);
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
    "/removePoint/:id",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
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
      removePointFromUser(req)
        .then((result) => {
          return res.status(200).json(result);
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
    "/removePoint/:longitude/:latitude",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
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
      removePointFromUser(req)
        .then((result) => {
          return res.status(200).json(result);
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

  router.get('/sendNotif/:idPoint',
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
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
      sendNotif(req, res)
        .then(results => {
          return res.status(201).json(results);
        })
        .catch(error => {
          return res.status(500).json({
            message: 'An error has occured',
            error: error
          });
        })
        .done()
    });


  router.post(
    "/",
    function (req, res, next) {
      verifyToken(req, res)
        .then((decodedToken) => {
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
      isAdminToken(req, res)
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
      generatePassword(req, res)
        .then(() => {
          next()
        })
        .catch(error => {
          return res.status(401).json({
            message: 'An error has occured',
            error: error
          });
        })

    },
    function (req, res, next) {
      setUser(req)
        .then((result) => {
          return res.status(200).json(result);
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
      isAdminToken(req, res)
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
      deleteUser(req)
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
      isAdminToken(req, res)
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

  router.get(
    "/usersByPoint/:id",
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
      getUsersByPoint(req)
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

  router.post(
    "/forgetPassword",
    function (req, res, next) {
      sendForgetPassword(req)
        .then((result) => {
          console.log(result)
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(200).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  router.post(
    "/updatePassword",
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
            error: "invalid token jjjj",
          });
        })
        .done();
    },
    function (req, res, next) {
      updatePassword(req)
        .then((result) => {
          console.log(result)
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(422).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );


  return router
}
module.exports = userController;
