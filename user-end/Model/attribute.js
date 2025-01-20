import mongoose from 'mongoose';


const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // The name of the attribute (e.g., "age", "gender")
  type: { type: String, required: true }, // The data type of the attribute (e.g., "number", "string")
});


const Attribute = mongoose.models.Attribute || mongoose.model('Attribute', attributeSchema);

export default Attribute;