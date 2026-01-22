import { Router } from "express";
import {
  createCaregiverProfile,
  getAllCaregivers,
  getCaregiverById,
  updateCaregiver,
  getMyProfile,
  getMyOverview,
  getMySchedule,
  createReview,
  getReviewsByCaregiverId,
  updateCaregiverPicture,
  aiCaregiversSuggestion,
  aiCaregiversEmbedded
} from "../../modules/caregiver/caregiver.controller.js";
import { auth } from "../../middlewares/auth.js";

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
router.get("/me/overview", getMyOverview);

// dashboard schedule http://localhost:3000/api/v1/caregivers/me/schedule
router.get("/me/schedule", getMySchedule);

// READ http://localhost:3000/api/v1/caregivers/:id
router.get("/:id", auth, getCaregiverById);

// create review http://localhost:3000/api/v1/caregivers/:id/reviews
router.post("/:id/reviews", auth, createReview);

// read review http://localhost:3000/api/v1/caregivers/:id/reviews
router.get("/:id/reviews", getReviewsByCaregiverId);

// update picture http://localhost:3000/api/v1/caregivers/:id/picture
router.post("/:id/picture", updateCaregiverPicture);


// GEMINI
// Send prompt with senior information and carenote of a specific booking to GEMENI and generate a care suggestion response for ceregiver
router.post("/ai/suggestion", aiCaregiversSuggestion);

// Create embedded vector for each specific caregivers
router.get("/ai/suggestion/:id", aiCaregiversEmbedded);
