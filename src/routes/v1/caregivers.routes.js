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
} from "../../modules/caregiver/caregiver.controller.js";

export const router = Router();

// CREATE http://localhost:3000/api/v1/caregivers
router.post("/", createCaregiverProfile);

// UPDATE http://localhost:3000/api/v1/caregivers/:id
router.put("/:id", updateCaregiver);

// list http://localhost:3000/api/v1/caregivers
router.get("/", getAllCaregivers);

// READ http://localhost:3000/api/v1/caregivers/:id
router.get("/:id", getCaregiverById);

// ME http://localhost:3000/api/v1/caregivers/me
router.get("/me", getMyProfile);

// dashboard overview http://localhost:3000/api/v1/caregivers/me/overview
router.get("/me/overview", getMyOverview);

// dashboard schedule http://localhost:3000/api/v1/caregivers/me/schedule
router.get("/me/schedule", getMySchedule);

// create review http://localhost:3000/api/v1/caregivers/:id/reviews
router.post("/:id/reviews", createReview);

// read review http://localhost:3000/api/v1/caregivers/:id/reviews
router.get("/:id/reviews", getReviewsByCaregiverId);

// update picture http://localhost:3000/api/v1/caregivers/:id/picture
router.post("/:id/picture", updateCaregiverPicture);

