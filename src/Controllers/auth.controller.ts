import { Request, Response } from "express";
import AuthService from "../Services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const { token, userId } = await AuthService.login(username, password);
      res.status(200).json({ token, userId });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
          } else {
            res.status(400).json({ error:"An unknown error occurred." });
          }
    }
  }
}

export default new AuthController();
