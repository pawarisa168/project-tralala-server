import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["SCHEDULED", "ACTIVE", "PENDING", "COMPLETED", "CANCELLED"],
    },
    schedule: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    clientNote: { type: String, trim: true },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    seniorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Senior",
    },
    packageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    billingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing",
    },
  },
  {
    timestamps: true,
  },
);

const packages = mongoose.model("package", packageSchema);

export default packages;
