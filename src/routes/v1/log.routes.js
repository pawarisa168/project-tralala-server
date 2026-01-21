import { Router } from "express";
import {getCaregiverLogs} from "../../modules/caregiver-log/caregiver-log.controller.js";

export const router = Router();


// PUT
router.put("/id", editCaregiverById);

// GET
router.get("/id", getActiveCaregivers);

// PATCH
router.patch("/id", addActiveLog);

// get data caregiver log http://localhost:3000/api/v1/caregiver-logs
router.get("/", getCaregiverLogs);

