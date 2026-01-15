import mongoose from "mongoose";

const mockData = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Data = mongoose.model("Data", mockData);

export default Data;