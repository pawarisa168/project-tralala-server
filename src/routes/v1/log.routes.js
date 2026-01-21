import { Router } from "express";
import {editCaregiverById, getActiveCaregivers, addActiveLog, getCaregiverLogs} from "../../modules/caregiver-log/caregiver-log.controller.js";

const routerLog = Router();


// PUT
routerLog.put("/id", editCaregiverById);
// GET
routerLog.get("/id", getActiveCaregivers);

// PATCH
routerLog.patch("/id", addActiveLog);

// get data caregiver log http://localhost:3000/api/v1/caregiver-logs
routerLog.get("/", getCaregiverLogs);

export default routerLog;