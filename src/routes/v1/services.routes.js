import { Router } from "express";
import { getServices, getServicesId } from "../../controller/services.controller.js";

const serviceRouter = Router();

// ดูบริการทั้งหมด
serviceRouter.get("/serviceslist", getServices);

// ดูข้อมูลบริการตามไอดี
serviceRouter.get("/serviceslist/:id", getServicesId);

export default serviceRouter;