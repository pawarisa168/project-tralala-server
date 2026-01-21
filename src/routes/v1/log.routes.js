import { Router } from "express";
import {getCaregiverLogs} from "../../modules/caregiver/caregiver.controller.js"

export const router = Router();

// get data caregiver log http://localhost:3000/api/v1/caregiver-logs
router.get("/", getCaregiverLogs);

