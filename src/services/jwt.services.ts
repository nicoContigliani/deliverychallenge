import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const jwtGenerateToken = async (data: any) => {
    let secretKey: any = process.env.JWT_SIGNATURE_GENERAL || "Esto Es Nueva";
    const token = jwt.sign(data, secretKey, { expiresIn: '10000h' });
    return token
}

export const jwtCompareToken = async (token: string) => {
    try {
        const secretKey: string = process.env.JWT_SIGNATURE_GENERAL || "Esto Es Nueva";
        const decoded = jwt.verify(token, secretKey);

        return decoded;
    } catch (error) {
        console.error("Error with token:", error);
        throw new Error("Token invalid o expired");
    }
}