import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  age: { type: Number, required: true }, 
  gender: { type: String, required: true }, 
  country: { type: String, required: true }, 
  userType: { type: String, required: true }, 
}, { timestamps: true }); 

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;