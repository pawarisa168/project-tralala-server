import mongoose from "mongoose";
import { Service } from "./services.models.js";
import { Customer } from "./customers.model.js";
import { Booking } from "./booking.model.js";

// BILLING
// shoppingCartItemSchema for using in billingSchema
const shoppingCartItemSchema = new mongoose.Schema(
  {
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { _id: false },
);

// data model of billings based on designed data schema of billings collection
const billingSchema = new mongoose.Schema(
  {
    shoppingCart: {
      type: [shoppingCartItemSchema],
      required: true,
    },
    billingSnapshot: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      address: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
    numberPackage: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    discount: { type: Number },
    netAmount: { type: Number, required: true },
    payentMethod: { type: String, enum: ["ONLINE_BANKING", "MASTERCARD", "VISA"] },
    status: { type: String, enum: ["PENDING", "PAID", "FAIL"], required: true },
    paidAt: { type: Date },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Billing = mongoose.model("Billing", billingSchema);
