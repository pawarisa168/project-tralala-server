import mongoose from "mongoose";

// model user
const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //ห้ามซ้ำกัน
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "CAREGIVER"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "CLOSED", "SUSPENDED"],
      required: true,
    },
  },
  { timestamps: true },
);

export const User = model("User", UserSchema);
