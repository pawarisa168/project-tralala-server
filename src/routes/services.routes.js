import { Router } from "express";
import { getServices, getServicesId } from "../controller/services.controller.js";

const serviceRouter = Router();

serviceRouter.get("/services", getServices);
serviceRouter.get("/services/:id", getServicesId);

export default serviceRouter;