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
});

export const Caregiver = model("Caregiver", CaregiverSchema);
