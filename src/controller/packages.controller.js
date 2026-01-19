import packages from "../models/packages.models.js";

export const getPackages = async (req, res) => {
  try {
    const Packages = await packages.find();

    console.log("Database Data:", Packages);
    res.status(200).json({
      success: true,
      message: "Choose your booking service ",
      data: Packages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPackagesId = async (req, res) => {
  const { id } = req.params;

  try {
    const packageId = await packages.findById(id)
    if (!packageId) {
      const err = new Error("Package not found");
      err.code = "NOT_FOUND";
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Get package details successfully ",
      data: packageId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
