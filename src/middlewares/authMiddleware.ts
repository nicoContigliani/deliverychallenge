import { Request, Response, NextFunction } from "express";
import { jwtCompareToken } from "../services/jwt.services";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware para proteger rutas con JWT
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.authorization?.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: "Token not recived" });
  }

  try {
    const decoded = await jwtCompareToken(token); 
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
};
