import express from "express";
import { register, login } from "../modules/auth/auth.controller.js";
import { registerSchema } from "../models/auth.models.js";
import { validate } from "../modules/auth/aith.validation.js";

export const router = express.Router();

//ENDPOINT http://localhost:3000/auth/register
router.post("/register", validate(registerSchema), register);

router.post("/login", login);
