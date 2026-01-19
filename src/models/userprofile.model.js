import mongoose from "mongoose";

const { Schema, model } = mongoose;
// model UserProfile
const userProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const UserProfile = model("UserProfile", userProfileSchema);
