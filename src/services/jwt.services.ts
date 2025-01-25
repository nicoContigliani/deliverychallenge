import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const jwtGenerateToken = async (data: any) => {
    let secretKey: any = process.env.JWT_SIGNATURE_GENERAL || "Esto Es Nueva";
    const token = jwt.sign(data, secretKey, { expiresIn: '10000h' }); // Token expires in 1 hour
    return token
}

export const jwtCompareToken = async () => {

}