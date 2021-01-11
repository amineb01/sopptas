const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ZoneSchema = new Schema({
  name:{ type:String, required:true },
  //points:[{type: Schema.Types.ObjectId, ref: 'Point'}]
});

module.exports = mongoose.model('Zone',ZoneSchema)
