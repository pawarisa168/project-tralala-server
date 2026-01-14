import mongoose from "mongoose";

const serviceSchema = new mongoose.schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    maxTime: { type: String },
    timeRange: { type: String },
    isActive: { type: Boolean },
    durationDay: { type: Number },
  },
  {
    timestamps: true,
  }
);
