import mongoose from "mongoose";

const { Schema, model } = mongoose;
// model Caregiver
const CaregiverSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  verification: {
    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  certifications: [
    {
      title: {
        type: String,
        required: true,
      },
      issuedBy: {
        type: String,
        required: true,
      },
      certifiedDate: {
        type: Date,
        required: true,
      },
      expiryDate: {
        type: Date,
        default: null,
      },
      certificateNumber: {
        type: String,
        default: "",
      },
      documentUrl: {
        type: String,
        default: "", //รูป
      },
    },
  ],
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  workStatus: {
    type: String,
    enum: ["AVAILABLE", "BUSY", "ON_LEAVE", "OFFLINE"],
    default: "AVAILABLE",
  },
  introduction: {
    type: String,
    required: true,
    trim: true,
  },
  ratingSummary: {
    average: Number,
    totalReviews: Number,
  },
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
  imageUrl: { type: String, trim: true },
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

export const Caregiver = model("Caregiver", CaregiverSchema);
