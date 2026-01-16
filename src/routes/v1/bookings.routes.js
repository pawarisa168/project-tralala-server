import { Router } from "express";
import {
    getBookings,
    getBooking,
    createBooking,
    updateBooking
} from "../../modules/bookings/bookings.controller.js";
import {
    getPayments,
    getPayment,
    createPayment,
    updatePayment
} from "../../modules/bookings/payments.controller.js";

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

// PAYMENT
// Retieve all payments information of specific clientID
router.get("/:cid/payments", getPayments);

// Retieve a specific payment information of specific clientID
router.get("/:cid/payments/:id", getPayment);

// Create a payment document
router.post("/:bid/payments", createPayment);

// Add senior field to a booking document
router.patch("/:bid/payments/:id", updatePayment);

