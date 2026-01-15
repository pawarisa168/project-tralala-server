import { Router } from "express";
import { createCustomers, getCustomerbyme, getCustomerId } from "../controller/customers.controller.js";

const customersRouter = Router();

customersRouter.use("/customers", createCustomers);
customersRouter.use("/cutsomers/me", getCustomerbyme);
customersRouter.use("/cutsomers/id", getCustomerId);

export default customersRouter;