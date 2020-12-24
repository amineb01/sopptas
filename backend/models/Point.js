const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//latitude
//longitude


var PointSchema = new Schema({
  location: {
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], default: [0, 0]}
   },
  name:{ type:String, required:true },
  zone: { type: Schema.Types.ObjectId, ref: 'Zone', required:true },
});

PointSchema.index({ location: "2dsphere" });


module.exports = mongoose.model('Point',PointSchema)
