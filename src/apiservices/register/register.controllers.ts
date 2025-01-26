import { Request, Response } from "express";
import { postDao } from './registerDao'; // Asegúrate de ajustar la ruta
import { getByEmailDao } from "../user/userDao";
import { bcryptCreatePassword } from "../../services/bcrypt.services";
import { deletePassword } from "../../services/deletePassword";
import { jwtGenerateToken } from "../../services/jwt.services";

export const postUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    let { fullname, email, password } = req.body;

    // Value exist ?
    if (!fullname || !email || !password) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }
    //if Exist?
    const user = await getByEmailDao(email);
    if (user) {
      res.status(400).json({ message: "The user already exists" });
      return;
    }

    // Encode password
    const hashedPassword = await bcryptCreatePassword(password);

    const newUser = await postDao({ fullname, email, password: hashedPassword });

    const beforeDataJwt = await deletePassword(newUser)
    const todo = await jwtGenerateToken(beforeDataJwt)


    res.status(201).json({ data: beforeDataJwt, token: todo });
    return;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
    return;
  }
};
