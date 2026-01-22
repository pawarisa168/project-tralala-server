import { Router } from "express";
import {
  createCustomer,
  getCustomerbyme,
  getCustomerId,
  getCustomerByUserId
} from "../../modules/customers/customers.controller.js";
import { auth } from "../../middlewares/auth.js";

const customersRouter = Router();

customersRouter.post("/", createCustomer);
customersRouter.get("/me", getCustomerbyme);
customersRouter.get("/:id", getCustomerId);
customersRouter.get("/user/:id", getCustomerByUserId);

export default customersRouter;
