const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{ type:String, required:true },
  email: { type:String, required:true },
  password: { type:String, required:true },
  device_token: { type:String , default: ''  },
  reclamations: [{ type: Schema.Types.ObjectId, ref: 'Reclamation' }],
  points: [{_id:{ type: Schema.Types.ObjectId, ref: 'Point' }}],
  status:{ type: String, enum: ['active', 'inactive'], default: 'active' },
  role: { type: String, enum: ['admin', 'restricted', 'citizen'], default: 'citizen' },//driver et guest
  current_zone: { type: Schema.Types.ObjectId, ref: 'Zone'},

});

UserSchema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({email: value });
  return !emailCount;
}, 'Email already exists');



module.exports = mongoose.model('User',UserSchema)
