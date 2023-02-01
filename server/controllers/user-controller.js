export class UseController {
  async registration(req, res, next) {
    try {
    } catch (error) {}
  }

  async logIn(req, res, next) {
    try {
    } catch (error) {}
  }

  async logOut(req, res, next) {
    try {
    } catch (error) {}
  }

  async refreshToken(req, res, next) {
    try {
    } catch (error) {}
  }

  async users(req, res, next) {
    try {
      res.json([1, 2, 3]);
    } catch (error) {}
  }
}

export const useController = new UseController();
