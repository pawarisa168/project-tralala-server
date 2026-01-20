import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  guardian: {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    relationship: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
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
});

const client = mongoose.model("client", clientSchema);

export default client;