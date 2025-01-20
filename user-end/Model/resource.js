// models/Resource.js
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  type: { type: String, required: true },  
  size: { type: Number, required: true },  
  policies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AccessPolicy',
      required: true,
    } 
  ],
  logicalOperators: [
    {
      type: String,
    },
  ],
  negations: [
    {
      type: Boolean, 
      default: false,
    },
  ],
});

export default mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
