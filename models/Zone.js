const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ZoneSchema = new Schema({
  name:{ type:String, required:true },
});

module.exports = mongoose.model('Zone',ZoneSchema)
