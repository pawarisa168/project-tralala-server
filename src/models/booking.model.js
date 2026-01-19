import mongoose from "mongoose";

// USER
// data model of users based on designed data schema of users collection
const userSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true, select: false },
  role: {
    type: String,
    enum: ["ADMIN", "CLIENT", "CAREGIVER"],
    required: true,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "CLOSED", "SUSPENDED"],
    required: true,
  },
  email: { type: String, trim: true, required: true },
  createdAt: { type: Date, trim: true, required: true },
});

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

// SENIOR
// data model of seniors based on designed data schema of seniors collection
const seniorSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  dob: { type: Date, default: null, required: true },
});

// PACKAGE
// data model of packages based on designed data schema of packages collection
const packageSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: String, trim: true, required: true },
});

// BOOKING
// data model of bookings based on designed data schema of bookings collection
const bookingSchema = new mongoose.Schema(
  {
    location: { type: String, trim: true },
    startLocation: { type: String, trim: true },
    targetLocation: { type: String, trim: true },
    status: {
      type: String,
      enum: ["SCHEDULED", "ACTIVE", "PENDING", "COMPLETED", "CANCELLED"],
      required: true,
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

// BILLING
// shoppingCartItemSchema for using in billingSchema
const shoppingCartItemSchema = new mongoose.Schema(
  {
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    packageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
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
    payentMethod: { type: String, enum: ["CARD", "TRANSFER"] },
    status: { type: String, enum: ["PENDING", "PAID", "FAIL"], required: true },
    paidAt: { type: Date },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Client = mongoose.model("Client", clientSchema);
export const Senior = mongoose.model("Senior", seniorSchema);
export const Package = mongoose.model("Package", packageSchema);
export const Booking = mongoose.model("Booking", bookingSchema);
export const Billing = mongoose.model("Billing", billingSchema);
