import mongoose from "mongoose";

const { Schema, model } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
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
});

export const User = model("User", UserSchema);
