import { Router } from "express";
import {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    aiCareSuggestion
} from "../../modules/bookings/bookings.controller.js";
import {
    getBillings,
    getBilling,
    createBilling,
    updateBilling
} from "../../modules/bookings/billings.controller.js";

export const router = Router();

// BOOKING
// Retieve all bookings information
router.get("/", getBookings);

// Retieve a specific booking information
router.get("/:bid", getBooking);

// Create a booking document
router.post("/", createBooking);

// Add senior field to a booking document
router.patch("/:bid", updateBooking);

// Billing
// Retieve all billings information of specific clientID
router.get("/:cid/billings", getBillings);

// Retieve a specific Billing information of specific clientID
router.get("/:cid/billings/:id", getBilling);

// Create a Billing document
router.post("/:bid/billings", createBilling);

// Add senior field to a booking document
router.patch("/:bid/billings/:id", updateBilling);

// GEMINI
// Send prompt with senior information and carenote of a specific booking to GEMENI and generate a care suggestion response for ceregiver
router.patch("/:bid/ai/suggestion", aiCareSuggestion);


