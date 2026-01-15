import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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

const booking = mongoose.model("booking", bookingSchema);

export default booking;
