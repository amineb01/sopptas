var User = require('../models/User')
var checkUserByEmail = require('../middlewares/checkUserByEmail')
var { generateToken, verifyToken } = require('../middlewares/token')
var { generatePassword, checkPassword } = require('../middlewares/password')


var { setUser, getUsers, addPointToUser, removePointFromUser } = require('../middlewares/users')

const userController = (express) => {
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time to access users route: ', new Date().toLocaleDateString("en-US"));
  next();
});

router.get('/',
  function(req, res, next) {
    getUsers(req, res)
    .then( results =>{
      return res.status(201).json({
        message: 'success',
        results,
      });
     })
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })
    .done()
  });

router.post('/signup',
  function(req, res, next) {
    generatePassword(req, res)
    .then( () =>{
      next()
     })
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })

  },
  function(req, res, next) {
    setUser(req, res)
    .then( result => next())
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured0' ,
        error:  error
      });
    }) },
    function(req, res, next) {
      generateToken(req, res)
      .then( token => {
        return res.status(201).json({
          message: 'user created',
          data: {
            id:    req.body.id,
            email: req.body.email,
            name:  req.body.name,
            token: token
          }
        });
      })
      .catch( error => {
        return res.status(500).json({
          message: 'An error has occured' ,
          error:  error
        });
      })
      .done()
    }
  );

router.post('/signin',
  function(req, res, next) {
    checkUserByEmail(req, res)
    .then( result =>  next() )
    .catch( error => {
      return res.status(200).json({
        message: 'An error has occured' ,
        error:  error
      });
    })

  },
  function(req, res, next) {
    checkPassword(req, res)
    .then( result => next() )
    .catch( error => {
      return res.status(200).json({
        message: 'An error has occured' ,
        error:  error
      });
    })
    .done()
  },
  function(req, res, next) {
    generateToken(req, res)
    .then( token => {
      return res.status(201).json({
        message: 'user authenticated',
        data: {
          id:    req.body.id,
          email: req.body.email,
          name:  req.body.name,
          role:  req.body.role,
          token: token
        }
      });
    })
    .catch( error => {
      return res.status(500).json({
        message: 'An error has occured' ,
        error:  error
      });
    })
    .done()
  },
);

router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(result => {
      res.status(201).json({
        message: 'success',
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

return router
}
module.exports = userController;
