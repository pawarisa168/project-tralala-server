import { Router } from "express";
import { getPackages, getPackagesId } from "../../controller/packages.controller.js";

const packageRouter = Router();

// ดูบริการทั้งหมด
packageRouter.get("/packageslist", getPackages);

// ดูข้อมูลบริการตามไอดี
packageRouter.get("/packageslist/:id", getPackagesId);

export default packageRouter;