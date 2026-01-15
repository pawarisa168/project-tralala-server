import { Router } from "express";
import { getHome, getAbout, getBookingList, getProductList, getContact } from "../controller/ฺbooking.controller.js"

const bookingRouter = Router();

bookingRouter.use("/", getHome);
bookingRouter.use("/about", getAbout);
bookingRouter.use("/booking-list", getBookingList);
bookingRouter.use("/product-list", getProductList);
bookingRouter.use("/contact", getContact);

export default bookingRouter;
