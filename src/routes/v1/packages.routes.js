import { Router } from "express";
import { getPackages, getPackagesId } from "../../controller/packages.controller.js";

const PackageRouter = Router();

// ดูบริการทั้งหมด
PackageRouter.get("/Packageslist", getPackages);

// ดูข้อมูลบริการตามไอดี
PackageRouter.get("/Packageslist/:id", getPackagesId);

export default PackageRouter;