import mongoose from "mongoose";

// CUSTOMER
// data model of clients based on designed data schema of clients collection
const customerSchema = new mongoose.Schema(
  {
    guardian: {
      firstName: { type: String, trim: true, required: true },
      lastName: { type: String, trim: true, required: true },
      relationship: { type: String, trim: true, required: true },
      phone: { type: String, trim: true, required: true },
      email: { type: String, trim: true, required: true },
    },
    seniors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Senior",
        required: true,
      },
    ],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export const Customer = mongoose.model("Customer", customerSchema);
