import { Billing } from "../../models/billing.model.js";

// route handler: get all billings from the database
export const getBillings = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const billings = await Billing.find({ customerID: cid });
    return res.status(200).json({
      success: true,
      data: billings,
    });
  } catch (error) {
    error.name = error.name || "DatabaseError";
    error.status = 500;
    return next(error);
  }
};

// route handler: GET a single Billing by id from the database
export const getBilling = async (req, res, next) => {
  const { cid, id } = req.params;

  try {
    const doc = await Billing.findById(id).find({ customerID: cid });
    if (!doc) {
      const error = new Error("Billing not found");
      return next(error);
    }
    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to get a Billing";
    return next(error);
  }
};

// route handler: create a new Billing in the database
export const createBilling = async (req, res, next) => {
  const {
    customerID,
    shoppingCart,
    numberPackage,
    totalAmount,
    discount,
    netAmount,
    status,
  } = req.body;

  if (
    !customerID ||
    !shoppingCart ||
    !numberPackage ||
    !totalAmount ||
    !netAmount ||
    !status
  ) {
    const error = new Error("missing some required information");
    error.name = "ValidationError";
    error.status = 400;
    return next(error);
  }

  try {
    const doc = await Billing.create({
      customerID,
      shoppingCart,
      numberPackage,
      totalAmount,
      discount,
      netAmount,
      status,
    });
    const safe = doc.toObject();

    return res.status(201).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to create a user";
    return next(error);
  }
};

// route handler: update a Billing in the database
export const updateBilling = async (req, res, next) => {
  const { bid, id } = req.params;

  const body = req.body;

  try {
    const updated = await Billing.findByIdAndUpdate(id, body, {
      runValidators: true,
    });

    if (!updated) {
      const error = new Error("Billing not found...");

      return next(error);
    }

    const safe = updated.toObject();
    // delete safe.password;

    return res.status(200).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(error);
    }
    return next(error);
  }
};
