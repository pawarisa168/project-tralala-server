import { Router } from "express";
import { createCustomer, getCustomerbyme, getCustomerId } from "../../controller/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/customer", createCustomer);
customersRouter.get("/customer/me", getCustomerbyme);
customersRouter.get("/customers/:id", getCustomerId);

export default customersRouter;