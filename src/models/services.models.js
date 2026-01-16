import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    maxTime: { type: String },
    timeRange: { type: String },
    isActive: { type: Boolean },
    durationDay: { type: Number },
  },
);

const services = mongoose.model("packages", servicesSchema);

export default services;
