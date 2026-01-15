import { Router } from "express";
import { getServices, getServicesId } from "../controller/services.controller.js";

const serviceRouter = Router();

serviceRouter.use("/services", getServices);
serviceRouter.use("/services/:id", getServicesId);

export default serviceRouter;