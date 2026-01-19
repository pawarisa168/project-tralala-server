import mongoose from "mongoose";

// model Review
const { Schema, model } = mongoose;
const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      validate: {
        validator: Number.isInteger,
        message: "Rating must be a whole number",
      },
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
      minlength: 10,
    },
    BookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookings",
      required: [true, "Booking ID is required"],
      index: true,
    },
    caregiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "caregivers",
      required: true,
      index: true,
    },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Review = model("Review", ReviewSchema);
