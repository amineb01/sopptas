var Zone = require('../models/Zone')

var { setZone, getZones, getOneZone } = require('../middlewares/zones')

const ZoneController = (express) => {
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time to access Zones route: ', new Date().toLocaleDateString("en-US"));
  next();
});

router.post('/',(req,res) => {
  setZone(req).then(result=>{
    return res.status(200).json({
      result:result
    });
  }).catch( error => {
    return res.status(500).json({
      message: 'An error has occured' ,
      error:  error
    });
  })
  .done()
})


router.get('/:id',(req,res) => {
  getOneZone(req).then(result=>{
    return res.status(200).json({
      result:result
    });
  }).catch( error => {
    return res.status(500).json({
      message: 'An error has occured' ,
      error:  error
    });
  })
  .done()
})

router.get('/',(req,res) => {
  getZones(req).then(result=>{
    return res.status(200).json({
      result:result
    });
  }).catch( error => {
    return res.status(500).json({
      message: 'An error has occured' ,
      error:  error
    });
  })
  .done()
})

return router
}


module.exports = ZoneController;
