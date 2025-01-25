import { Request, Response, NextFunction } from "express";
import { jwtCompareToken } from "../services/jwt.services";  // Asegúrate de ajustar la ruta a tu servicio JWT

declare global {
    namespace Express {
      interface Request {
        user?: any; // Aquí puedes poner el tipo correcto de 'user' según tu modelo
      }
    }
  }
  
// Middleware para proteger rutas con JWT
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];  // Extraemos el token del encabezado Authorization

    // Verificamos que el token esté presente
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        // Comparamos y verificamos el token utilizando el servicio jwtCompareToken
        const decoded = await jwtCompareToken(token);  // Si el token es válido, decoded tendrá el payload

        // Agregamos el payload del token a la solicitud para su uso en la ruta protegida
        req.user = decoded;  // Esto puede incluir datos del usuario, como el ID

        // Llamamos a la siguiente función de middleware o ruta
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};
