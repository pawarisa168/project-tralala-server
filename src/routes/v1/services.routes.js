import { Router } from "express";
import { getServices, getServicesId } from "../../controller/services.controller.js";

const serviceRouter = Router();

serviceRouter.get("/serviceslist", getServices);
serviceRouter.get("/serviceslist/:id", getServicesId);

export default serviceRouter;