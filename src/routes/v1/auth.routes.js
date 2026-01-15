import { Router } from "express";
import { register, login } from "../../modules/auth/auth.controller.js";
import { registerSchema } from "../../models/auth.models.js";
import { validate } from "../../modules/auth/aith.validation.js";

export const router = Router();

//ENDPOINT http://localhost:3000/api/v1/auth/register
router.post("/register", validate(registerSchema), register);

router.post("/login", login);
