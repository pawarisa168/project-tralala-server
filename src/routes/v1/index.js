import { Router } from "express";
import { router as authRouter } from "./auth.routes.js";
import { router as caregiversRouter } from "./caregivers.routes.js";
import { router as costumersRouter } from "./costumers.routes.js";
import { router as bookingRouter } from "./bookings.routes.js";
import { router as serviceRouter } from "./services.routes.js";
import { router as logRouter } from "./log.routes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/caregivers", caregiversRouter);
router.use("/costumers", costumersRouter);
router.use("/bookings", bookingRouter);
router.use("/services", serviceRouter);
router.use("/caregiver-log", logRouter);
