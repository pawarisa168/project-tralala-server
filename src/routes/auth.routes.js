import Router from "express";
import { register, login } from "../controller/auth/auth.controller.js";
import { registerSchema } from "../models/auth.models.js";
import { validate } from "../controller/auth/aith.validation.js";

const authRouter = Router();

//ENDPOINT http://localhost:3000/auth/register
authRouter.post("/register", validate(registerSchema), register);

authRouter.post("/login", login);

export default authRouter;