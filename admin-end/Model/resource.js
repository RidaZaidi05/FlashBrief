// models/Resource.js
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },  
  content: { type: String, required: true },  
  publishedDate: { type: Date, required: true }, 
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
