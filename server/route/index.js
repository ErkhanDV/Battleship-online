import { Router } from "express";
import { useController } from "../controllers/user-controller.js";

const router = new Router();

router.post("/registration", useController.registration);
router.post("/login", useController.logIn);
router.post("/logout", useController.logOut);
router.get("/refresh", useController.refreshToken);
router.get("/users", useController.users);

export default router;
