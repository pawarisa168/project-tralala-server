import { Router } from "express";
import {
  createCustomer,
  getCustomerbyme,
  getCustomerId,
} from "../../modules/customers/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/", createCustomer);
customersRouter.get("/me", getCustomerbyme);
customersRouter.get("/:id", getCustomerId);

export default customersRouter;
