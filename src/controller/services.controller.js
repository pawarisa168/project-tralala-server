import packages from "../models/services.models.js";

export const getServices = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Choose your booking service ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
