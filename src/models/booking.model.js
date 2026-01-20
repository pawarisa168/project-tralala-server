import mongoose from "mongoose";

// BOOKING
// data model of bookings based on designed data schema of bookings collection
const bookingSchema = new mongoose.Schema(
  {
    location: { type: String, trim: true },
    startLocation: { type: String, trim: true },
    targetLocation: { type: String, trim: true },
    status: {
      type: String,
      enum: ["SCHEDULED", "ACTIVE", "PENDING", "COMPLETED", "CANCELLED"],
      required: true,
    },
    schedule: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    clientNote: { type: String, trim: true },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    seniorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Senior",
    },
    packageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    billingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing",
    },
    seniorCareSummary: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model("Booking", bookingSchema);
