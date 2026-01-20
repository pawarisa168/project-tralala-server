import { Router } from "express";
import {
    aiCaregiversSuggestion,
    aiCaregiversEmbedded
} from "../../controller/caregiver.controller.js";

export const router = Router();


// GEMINI
// Send prompt with senior information and carenote of a specific booking to GEMENI and generate a care suggestion response for ceregiver
router.post("/ai/suggestion", aiCaregiversSuggestion);

router.get("/ai/suggestion/:id", aiCaregiversEmbedded);
