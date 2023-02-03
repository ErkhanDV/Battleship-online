import { Router } from "express";
import expressWs from "express-ws";
import { userController } from "../controllers/user-controller.js";
import { body } from "express-validator";

const router = new Router();
expressWs(router);

router.post("/login", body("name").isLength({ min: 3 }), userController.logIn);
router.delete("/logout", userController.logOut);
router.get("/refresh", userController.refreshToken);
router.get("/getusers", userController.getUsers);
router.get("/startgame", userController.startGame);
router.ws("/game/:id", userController.game);

export default router;
