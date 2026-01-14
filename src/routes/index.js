import { Router } from "express";

export const router = Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/services-list", getServicesList);
router.get("/product-list", getProductList);
router.get("/contact", getContact);