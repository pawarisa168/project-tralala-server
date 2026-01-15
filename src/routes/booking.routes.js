import { Router } from "express";
import { getHome, getAbout, getServicesList, getProductList, getContact } from "../controller/ฺbooking.controller.js"

const bookingRouter = Router();

bookingRouter.get("/", getHome);
bookingRouter.get("/about", getAbout);
bookingRouter.get("/services-list", getServicesList);
bookingRouter.get("/product-list", getProductList);
bookingRouter.get("/contact", getContact);

export default bookingRouter;
