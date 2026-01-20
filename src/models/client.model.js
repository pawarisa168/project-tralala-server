import mongoose from "mongoose";

// CLIENT
// data model of clients based on designed data schema of clients collection
const clientSchema = new mongoose.Schema({
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
});

export const Client = mongoose.model("Client", clientSchema);
