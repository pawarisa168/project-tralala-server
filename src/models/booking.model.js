import mongoose from "mongoose";
import { Senior } from "./senior.model.js";
import { Customer } from "./customers.model.js";
import { Service } from "./services.models.js";
import { Billing } from "./billing.model.js";

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
    customerID: { type: String, trim: true },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    seniorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Senior",
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
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
