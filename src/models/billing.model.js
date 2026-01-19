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

export const Billing = mongoose.model("Billing", billingSchema);
