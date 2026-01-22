import { Router } from "express";
import {
  createCaregiverProfile,
  getAllCaregivers,
  getCaregiverById,
  updateCaregiver,
  getMySchedule,
  createReview,
  getReviewsByCaregiverId,
  updateCaregiverPicture,
  getMyProfile,
} from "../../modules/caregiver/caregiver.controller.js";
import { auth } from "../../middlewares/auth.js";
import { getMyOverview } from "../../modules/caregiver/dashbord.controller.js";

export const router = Router();

// CREATE http://localhost:3000/api/v1/caregivers
router.post("/", createCaregiverProfile);

// UPDATE http://localhost:3000/api/v1/caregivers/:id
router.put("/:id", updateCaregiver);

// list http://localhost:3000/api/v1/caregivers
router.get("/", getAllCaregivers);

// ME http://localhost:3000/api/v1/caregivers/me
//ก่อนดึงโปรไฟล์ออกมา ทำ auth ก่อน
router.get("/me", auth, getMyProfile);

// dashboard overview http://localhost:3000/api/v1/caregivers/me/overview
router.get("/me/overview", auth, getMyOverview);

// dashboard schedule http://localhost:3000/api/v1/caregivers/me/schedule
router.get("/me/schedule", getMySchedule);

// READ http://localhost:3000/api/v1/caregivers/:id
router.get("/:id", getCaregiverById);

// create review http://localhost:3000/api/v1/caregivers/:id/reviews
router.post("/:id/reviews", auth, createReview);

// read review http://localhost:3000/api/v1/caregivers/:id/reviews
router.get("/:id/reviews", getReviewsByCaregiverId);

// update picture http://localhost:3000/api/v1/caregivers/:id/picture
router.post("/:id/picture", updateCaregiverPicture);
