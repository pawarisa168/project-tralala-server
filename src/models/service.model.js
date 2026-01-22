import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, },
    price: { type: Number, trim: true, },
    maxTime: { type: String, trim: true, },
    timeRange: { type: String },
    isActive: { type: Boolean },
    durationDay: { type: Number },
  },
);

export const Service = mongoose.model("Service", servicesSchema);
