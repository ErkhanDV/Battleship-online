import jwt from "jsonwebtoken";
import { ModelToken } from "../models/token-model.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SERCRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.SERCRET_KEY, {
      expiresIn: "1h",
    });
    return { accessToken, refreshToken };
  }

  validateToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SERCRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(id, refreshToken) {
    const tokenData = await ModelToken.findOne({ userId: id });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await ModelToken.create({ userId: id, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await ModelToken.deleteOne({
      refreshToken: refreshToken,
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await ModelToken.findOne({
      refreshToken: refreshToken,
    });
    return tokenData;
  }

}

export const tokenService = new TokenService();
