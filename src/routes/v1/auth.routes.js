import { Router } from "express";
import { register, login } from "../../modules/auth/auth.controller.js";

// export const router = Router();

// http://localhost:3000/api/v1/auth/register
router.post("/register", register);

// http://localhost:3000/api/v1/auth/login
router.post("/login", login);
