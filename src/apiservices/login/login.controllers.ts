import { Request, Response } from "express";
import { getByEmailDao } from './loginDao'; // Make sure to adjust the path
import { bcryptComparePassword } from "../../services/bcrypt.services";
import { deletePassword } from "../../services/deletePassword";
import { jwtGenerateToken } from "../../services/jwt.services";

export const postLoginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user: any = await getByEmailDao(email);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcryptComparePassword(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    const beforeDataJwt = await deletePassword(user);

    const token = await jwtGenerateToken(beforeDataJwt);

    res.status(200).json({ data: beforeDataJwt, token });
    return;

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login", error });
    return;
  }
};
