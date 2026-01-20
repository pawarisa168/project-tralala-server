import mongoose from "mongoose";
import { User } from "./auth.models.js";

// CAREGIVER
// certificationsSchema for using in caregiverSchema
const certificationsSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    issuedBy: { type: String, trim: true, required: true },
    certifiedDate: { type: Date, default: null, required: true },
  },
  { _id: false },
  {
    timestamps: true,
  }
);

// verificationSchema for using in caregiverSchema
const verificationSchema = new mongoose.Schema(
  {
    status: { type: String, trim: true, required: true },
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    },
  },
  { _id: false },
  {
    timestamps: true,
  }
);

// ratingSummarySchema for using in caregiverSchema
const ratingSummarySchema = new mongoose.Schema(
  {
    average: { type: Number, trim: true},
    totalReviews: { type: Number, trim: true}
  },
  { _id: false },
  {
    timestamps: true,
  }
);

// data model of caregiveres based on designed data schema of caregiveres collection
const caregiverSchema = new mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    gender: { type: String, trim: true, required: true },
    dob: { type: Date, default: null, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    skills: { type: Array, trim: true },
    introduction: { type: String, trim: true },
    certifications: {
      type: [certificationsSchema],
      required: true,
    },
    verification: {
      type: verificationSchema
    },
    workStatus: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE"],
      default: "UNAVAILABLE",
    },
    ratingSummary: {
      type: ratingSummarySchema
    },
    embedding: {
      status: {
        type: String,
        enum: ["PENDING", "PROCESSING", "READY", "FAILED"],
        default: "PENDING",
      },
      dims: { type: Number, default: 3072 },
      vector: { type: [Number], select: false },
      attempts: { type: Number, default: 0 },
      lastAttemptAt: { type: Date, default: null },
      updatedAt: { type: Date, default: null },
      lastError: { type: String, default: null },
    }
  },
  {
    timestamps: true,
  }
);

export const Caregiver = mongoose.model("Caregiver", caregiverSchema);
