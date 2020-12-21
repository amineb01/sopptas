const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{ type:String, required:true },
  email: { type:String, required:true, unique: true },
  password: { type:String, required:true },
  reclamations: [{ type: Schema.Types.ObjectId, ref: 'Reclamation' }],
  role: { type: String, enum: ['admin', 'restricted', 'citizen'], default: 'citizen' },
});

// UserSchema.path('email').validate(async (value) => {
//   const emailCount = await mongoose.models.User.countDocuments({email: value });
//   return !emailCount;
// }, 'Email already exists');

UserSchema.plugin(uniqueValidator);



module.exports = mongoose.model('User',UserSchema)
