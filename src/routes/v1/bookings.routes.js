import { Router } from "express";
import {
    getBookings,
    getBooking,
    createBooking
} from "../../modules/bookings/bookings.controller.js";

export const router = Router();

// Retieve all bookings information
router.get("/", getBookings);

// Retieve a specific booking information
router.get("/:id", getBooking);

// Create a booking document
router.post("/", createBooking);
