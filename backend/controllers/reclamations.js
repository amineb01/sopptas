var Reclamation = require('../models/Reclamation')
var upload = require('../helpers/multerConfig')
var { verifyToken, isCollaboratorToken }= require('../middlewares/token')
var { setReclamation, getReclamations, getOneReclamation, update } = require('../middlewares/reclamations')

const reclamationController = (express) => {
  const router = express.Router();
  router.use((req, res, next) => {
    console.log('Time to access reclamations route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/',
    function(req, res, next) {
      verifyToken(req, res)
      .then( decodedToken =>{
        req.headers.id = decodedToken.id;
        req.headers.role = decodedToken.role;
         next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },

    function(req, res, next) {
      isCollaboratorToken(req, res)
      .then( userId =>{
        next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },

    function(req, res, next) {
      getReclamations(req, res)
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
    }
  );

  router.post('/',
    function(req, res, next) {
      verifyToken(req, res)
      .then( userId =>{
         next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },

    upload.single('image'),

    function(req, res, next) {
      setReclamation(req, res)
      .then( results =>{
        return res.status(201).json({
          message: 'reclamation created',
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
    }
 );


  router.get('/:id',
    function(req, res, next) {
      verifyToken(req, res)
      .then( userId =>{
         next()
       })
      .catch( error => {
        return res.status(401).json({
          message: error,
          error: 'invalid token'
        });
      })
      .done()
    },

    function(req, res, next) {
      getOneReclamation(req, res)
      .then( result =>{
        return res.status(201).json(result);
       })
      .catch( error => {
        return res.status(500).json({
          message: 'reclamation not found' ,
          error:  error
        });
      })
      .done()
    }

  )
  
  router.put('/:id',
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
      console.log("ss"+ req.body)
      update(req, res)
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

  )

  return router
}



module.exports = reclamationController;
