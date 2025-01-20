// models/AccessPolicy.js
import mongoose from 'mongoose';

const accessPolicySchema = new mongoose.Schema({
  name: { type: String, required: true },  
  conditions: [{
    attribute: { type: String, required: true },  // e.g., "age", "userType", "isOldCustomer"
    operator: { type: String, required: true },   // e.g., ">", "<", "=="
    value: { type: mongoose.Schema.Types.Mixed, required: true }, // The value for comparison
  }],
  logicalOperators: [{ type: String }],  // e.g., ["AND", "OR"] for combining conditions
  negations: [{ type: Boolean }],         // e.g., [false, true] for !condition3
});

export default mongoose.models.AccessPolicy || mongoose.model('AccessPolicy', accessPolicySchema);
