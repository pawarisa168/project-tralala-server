import { Router } from "express";
import { router as authRouter } from "../v1/auth.routes.js";
import { router as caregiversRouter } from "./caregivers.routes.js";
import customersRouter from "./customers.routes.js";
import { router as bookingRouter } from "./bookings.routes.js";
import serviceRouter from "./services.routes.js";
import logRouter from "./log.routes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/caregivers", caregiversRouter);
router.use("/customers", customersRouter);
router.use("/bookings", bookingRouter);
router.use("/services", serviceRouter);
router.use("/caregiver-logs", logRouter);
