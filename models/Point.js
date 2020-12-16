const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointSchema = new Schema({
  longitude:{ type:String, required:true },
  latitude: { type:String, required:true },
  zone: { type: Schema.Types.ObjectId, ref: 'Zone' },

});

module.exports = mongoose.model('Point',PointSchema)
