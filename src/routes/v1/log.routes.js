import { Router } from "express";

export const router = Router();


// PUT
router.put("/id", editCaregiverById);

// GET
router.get("/id", getActiveCaregivers);

// PATCH
router.patch("/id", addActiveLog);


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