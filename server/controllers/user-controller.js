import { userService } from "../services/user-service.js";
import { validationResult } from "express-validator";
import router from "../route/index.js";

export class UserController {
  async logIn(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(errors);

      if (!errors.isEmpty()) {
        return res.status(403).json({ message: "Имя слишком короткое" });
      }

      const { name } = req.body;
      const userData = await userService.logIn(name);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async logOut(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logOut(refreshToken);

      res.clearCookie(refreshToken);
      return res.status(200).json({ message: "Пользователь удален" });
    } catch (error) {}
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie(
        "user",
        { id: userData.id, refreshToken: userData.refreshToken },
        {
          maxAge: 3600000,
          httpOnly: true,
        }
      );

      return res.status(200).json(userData);
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      return res.status(200).json(users);
    } catch (error) {}
  }

  async startGame(req, res, next) {
    const { refreshToken } = req.cookies;
    const userToConnect = await userService.startGame(refreshToken);
    let wsLink;

    if (userToConnect) {
      wsLink = `/game/:${userToConnect._id}`;
      router.ws(wsLink, userService.game);
    } else {
      wsLink = `/game/:${id}`;
      router.ws(wsLink, userService.game);
    }

    return res.status(200).json(wsLink);
  }

  game(ws, req) {
    ws.on();
  }
}

export const userController = new UserController();
