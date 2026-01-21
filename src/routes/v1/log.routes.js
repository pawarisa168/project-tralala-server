import { Router } from "express";
import {
  editCaregiverById,
  getActiveCaregivers,
  addActiveLog,
  getCaregiverLogs,
} from "../../modules/caregiver-log/caregiver-log.controller.js";

const routerLog = Router();

// get data caregiver log http://localhost:3000/api/v1/caregiver-logs
routerLog.get("/", getCaregiverLogs); //เส้นนี้ผ่านแล้ว

// PUT
routerLog.put("/edit/:id", editCaregiverById);

// GET
routerLog.get("/active", getActiveCaregivers);

// PATCH
routerLog.patch("/addactive/:id", addActiveLog);

export default routerLog;
