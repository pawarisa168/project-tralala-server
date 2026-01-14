import { Router } from "express";

export const router = Router();

router.get("/", home);
router.get("about", about);
router.get("serviceslist", serviceslist);
router.get("productlist", productlist);
router.get("contact", contact);
router.get("/login", usersLogin);