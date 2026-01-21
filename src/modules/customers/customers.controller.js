import { customer} from "../../models/customers.model.js"

export const createCustomer = async (req, res) => {
  const { guardian, seniors, userID } = req.body;

  if (!guardian || !userID) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  try {
    const newCustomer = await customer.create({
      guardian: {
        firstName: guardian.firstName,
        lastName: guardian.lastName,
        relationship: guardian.relationship,
        phone: guardian.phone,
        email: guardian.email,
      },
      seniors: seniors || [],
      userID: userID,
    });
    const safe = newCustomer.toObject();
    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: safe,
    });
  } catch (error) {
    console.error("Error code:", error.code);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Entry",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCustomerbyme = async (req, res) => {
  try {
    const customer = await Customer.find();
    console.log("Database Data:", customer);
    res.status(200).json({
      success: true,
      message: "Is'me ",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getCustomerId = async (req, res) => {
  const { id } = req.params;
  console.log("Customer ID:", id);
  try {
    const customerId = await Customer.findById(id);
    if (!customerId) {
      const err = new Error("Customer not found");
      err.code = "NOT_FOUND";
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Look some customer",
      data: customerId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
