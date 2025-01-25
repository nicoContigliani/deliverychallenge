import { Request, Response } from "express";
import {
  getDao,
  getIdDao,
  postDao,
  updateDao,
  deletesDao,
  postBulkDao
} from './registerDao'; // Asegúrate de ajustar la ruta
import { getByEmailDao } from "../user/userDao";
import { bcryptCreatePassword } from "../../services/bcrypt.services";
import { deletePassword } from "../../services/deletePassword";
import { jwtGenerateToken } from "../../services/jwt.services";

// 1. Obtener todos los usuarios
export const getUserSController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getDao();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// 2. Crear un nuevo usuario
export const postUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    let { fullname, email, password } = req.body;

    // Validar datos de entrada
    if (!fullname || !email || !password) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return; // Finaliza el flujo del controlador
    }

    // Verificar si el usuario ya existe
    const user = await getByEmailDao(email);
    if (user) {
      res.status(400).json({ message: "The user already exists" });
      return; // Finaliza el flujo del controlador
    }

    // Encriptar contraseña
    const hashedPassword = await bcryptCreatePassword(password);

    const newUser = await postDao({ fullname, email, password: hashedPassword });
    // console.log("🚀 ~ postUsersController ~ newUser:", newUser);


    // let newUser = {
    //   "fullname": "nicolas",
    //   "email": "pedro.contigliani@gmail.com",
    //   "password": "$2b$10$zIAHcC2Joe2sZVwODtU8Pupbak8/ANkFubWdtdEEXjvGOFOfVZP5y",
    //   "id": 5
    // }

    const beforeDataJwt = await deletePassword(newUser)
    const todo = await jwtGenerateToken(beforeDataJwt)


    res.status(201).json({ data: beforeDataJwt, token: todo });
    return; // Finaliza el flujo del controlador
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
    return; // Finaliza el flujo del controlador
  }
};

// 3. Actualizar un usuario existente
export const putUsersController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { fullname, email, password } = req.body;

  try {
    const updatedUser = await updateDao(Number(id), { fullname, email, password });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// 4. Eliminar un usuario por ID
export const deleteUsersController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deleted = await deletesDao(Number(id));
    if (deleted) {
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

// 5. Obtener un usuario por ID
export const getOneUsersController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await getIdDao(Number(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};
