var Reclamation = require('../models/Reclamation')
var upload = require('../helpers/multerConfig')
var { verifyToken }= require('../middlewares/token')
var { setReclamation, getReclamations, getOneReclamation } = require('../middlewares/reclamations')

const reclamationController = (express) => {
  const router = express.Router();
  router.use((req, res, next) => {
    console.log('Time to access reclamations route: ', new Date().toLocaleDateString("en-US"));
    next();
  });

  router.get('/',
    function(req, res, next) {
      verifyToken(req, res)
      .then( userId =>{
        req.headers.id = userId;
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
      getOneReclamation(req, res)
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
      .then( results =>{
        return res.status(201).json({
          message: 'reclamation found',
          results,
        });
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

  return router
}



module.exports = reclamationController;
