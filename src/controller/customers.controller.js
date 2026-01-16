export const createCustomers = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Crete Customer ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getCustomerbyme = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Is'me ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const getCustomerId = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Look some customers",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
