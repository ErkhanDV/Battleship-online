import jwt from "jsonwebtoken";
import { ModelToken } from "../models/token-model.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {
      expiresIn: '1h',
    });
    return { accessToken, refreshToken };
  }

  validateAcessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_ACCESS);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_REFRESH);
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
