import mongoose from "mongoose";

// PACKAGE
// data model of packages based on designed data schema of packages collection
const packageSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: String, trim: true, required: true },
});

export const Package = mongoose.model("Package", packageSchema);
