import { CareVisit } from "../../models/careVisit.model.js";

// get data caregiver logs
export const getCaregiverLogs = async (req, res) => {
  try {
    const CaregiverLogs = await CareVisit.find();
    res.status(200).json({ data: CaregiverLogs });
    console.log(CaregiverLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "cannot get data log" });
  }
};
export const editCaregiverById = async (req, res) => {
  try {
    console.log(200).json({
      success: true,
      message: "edit caregiver by id",
    });
  } catch (error) {
    console.error(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getActiveCaregivers = async (req, res) => {
  try {
    console.log(200).json({
      success: true,
      message: "get active caregivers",
    });
  } catch (error) {
    console.error(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const addActiveLog = async (req, res) => {
  try {
    console.log(200).json({
      success: true,
      message: "add active log",
    });
  } catch (error) {
    console.error(500).json({
      success: false,
      message: "server error",
    });
  }
};
