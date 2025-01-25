import { Request, Response } from "express";
import {
  getDao,
  getIdDao,
  postDao,
  updateDao,
  deletesDao,
  postBulkDao
} from './loginDao'; // Asegúrate de ajustar la ruta
import { getByEmailDao } from "../user/userDao";
import { bcryptComparePassword } from "../../services/bcrypt.services";
import { deletePassword } from "../../services/deletePassword";
import { jwtGenerateToken } from "../../services/jwt.services";

// 1. Obtener todos los usuarios
// export const getUserSController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await getDao();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener los usuarios", error });
//   }
// };

// 2. Crear un nuevo usuario
export const postLoginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verificar si los campos son obligatorios
    if (!email || !password) {
      res.status(400).json({ message: "El correo y la contraseña son obligatorios" });
      return;
    }

    const user:any = await getByEmailDao(email);
    if (!user) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    const passwordMatch = await bcryptComparePassword(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    }

    const beforeDataJwt = await deletePassword(user);

    const token = await jwtGenerateToken(beforeDataJwt);

    res.status(200).json({ data: beforeDataJwt, token });
    return;

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
    return;
  }
};

// // 3. Actualizar un usuario existente
// export const putUsersController = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { fullname, email, password } = req.body;

//   try {
//     const updatedUser = await updateDao(Number(id), { fullname, email, password });
//     if (updatedUser) {
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al actualizar el usuario", error });
//   }
// };

// // 4. Eliminar un usuario por ID
// export const deleteUsersController = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const deleted = await deletesDao(Number(id));
//     if (deleted) {
//       res.status(200).json({ message: "Usuario eliminado correctamente" });
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al eliminar el usuario", error });
//   }
// };

// // 5. Obtener un usuario por ID
// export const getOneUsersController = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const user = await getIdDao(Number(id));
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener el usuario", error });
//   }
// };
