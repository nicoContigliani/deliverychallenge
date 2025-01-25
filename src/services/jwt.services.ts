import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const jwtGenerateToken = async (data: any) => {
    let secretKey: any = process.env.JWT_SIGNATURE_GENERAL || "Esto Es Nueva";
    const token = jwt.sign(data, secretKey, { expiresIn: '10000h' }); // Token expires in 1 hour
    return token
}

export const jwtCompareToken = async (token: string) => {
    try {
        // Obtener la clave secreta del archivo .env
        const secretKey: string = process.env.JWT_SIGNATURE_GENERAL || "Esto Es Nueva";

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, secretKey); // Devuelve el payload si es válido

        // Si el token es válido, retornar el decoded (payload)
        return decoded;
    } catch (error) {
        // Si el token no es válido o ha expirado
        console.error("Error with token:", error);
        throw new Error("Token invalid o expired");
    }
}