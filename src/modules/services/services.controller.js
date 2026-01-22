import { Service } from "../../models/service.model.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    console.log("Database Data:", services);
    res.status(200).json({
      success: true,
      message: "Successfully get all service list",
      data: services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getServicesId = async (req, res) => {
  const { id } = req.params;

  try {
    const serviceId = await Service.findById(id);
    if (!serviceId) {
      const err = new Error("Service not found");
      err.code = "NOT_FOUND";
      throw err;
    }
    res.status(200).json({
      success: true,
      message: "Successfully get service detail",
      data: serviceId,
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
