const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReclamationSchema = new Schema({
  title:{ type:String, required:true },
  body: { type:String, required:true },
  date: Date,
  image:{ type:String, required:true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required:true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required:true },
  comments:[{type: Schema.Types.ObjectId, ref: 'Comment', default:null}],
},{
  timestamps:true
});

module.exports = mongoose.model('Reclamation',ReclamationSchema)
