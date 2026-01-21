import mongoose from "mongoose";

// SERVICES
// data model of services based on designed data schema of services collection
const servicesSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: String, trim: true, required: true },
});

export const service = mongoose.model("service", servicesSchema);