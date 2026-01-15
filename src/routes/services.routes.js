import { Router } from "express";
import { getServices } from "../controller/services.controller.js";

const serviceRouter = Router();

serviceRouter.use("/packages-list", getServices);

export default serviceRouter;
