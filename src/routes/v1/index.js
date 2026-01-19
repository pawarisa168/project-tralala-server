import { Router } from "express";
import { router as authRouter } from "../v1/auth.routes.js";
import { router as caregiversRouter } from "./caregivers.routes.js";
import customersRouter from "../v1/customers.routes.js";
import { router as bookingRouter } from "./bookings.routes.js";
import  PackageRouter  from "./packages.routes.js";
import { router as logRouter } from "./log.routes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/caregivers", caregiversRouter);
router.use("/customers", customersRouter);
router.use("/bookings", bookingRouter);
router.use("/packages", PackageRouter);
router.use("/caregiver-log", logRouter);
