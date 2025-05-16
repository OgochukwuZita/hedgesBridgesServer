import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: { type: [String], required: true }, 
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
