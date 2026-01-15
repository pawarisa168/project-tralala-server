import booking from "../models/booking.models.js";

export const getHome = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to Service Home",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getAbout = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "About us",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getServicesList = (req, res) => {
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
export const getProductList = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Our caregivers",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getContact = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: " Welcome to our partners ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Errror.",
      error,
    });
  }
};
