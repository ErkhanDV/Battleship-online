import { ModelUser } from "../models/user-model.js";
import { tokenService } from "./token-service.js";

class UserService {
  async logIn(name) {
    const candidate = await ModelUser.findOne({ name });


    if (candidate) {
      throw new Error("Пользователь с таким именем существует");
    }
    const user = await ModelUser.create({ name });
    const resUser = {
      name: user.name,
      id: user._id,
    };
    const tokens = tokenService.generateTokens(resUser);
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, ...resUser };
  }

  async logOut(refreshToken) {
    const userData = tokenService.validateToken(refreshToken);

    const user = await ModelUser.deleteOne({ _id: userData.id });
    const token = await tokenService.removeToken(refreshToken);
    return { user, token };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const userData = tokenService.validateToken(refreshToken);
    const tokenInDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenInDB) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const user = await ModelUser.findById(userData.id);
    const resUser = {
      name: user.name,
      id: user._id,
    };

    const tokens = tokenService.generateTokens(resUser);
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, ...resUser };
  }

  async getUsers() {
    const users = await ModelUser.find();
    return users;
  }

  async startGame(refreshToken) {
    const userData = tokenService.validateToken(refreshToken);
    const users = await this.getUsers();
    const opponent = users.find((user) => !!user.isWaitingGame);

    if (opponent) {
      await ModelUser.updateOne(
        { _id: opponent._id },
        { isWaitingGame: false }
      );
    } else {
      await ModelUser.updateOne({ _id: userData.id }, { isWaitingGame: true });
    }

    return opponent;
  }

  game(ws, req) {
    console.log("вебсокет");
  }






    
}

export const userService = new UserService();
