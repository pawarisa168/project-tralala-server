import { Router } from "express";
import {
  createCustomer,
  getCustomerbyme,
  getCustomerId,
} from "../../modules/customers/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/customer", createCustomer);
customersRouter.get("/customer/me", getCustomerbyme);
customersRouter.get("/customers/:id", getCustomerId);

export default customersRouter;
