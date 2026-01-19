import mongoose from "mongoose";

const mockData = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", mockData);

export default Data;
