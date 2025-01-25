import bcrypt from 'bcrypt';

export const bcryptCreatePassword = async (passwords: any) => {
    return await bcrypt.hash(passwords, 10)
}
export const bcryptComparePassword = async (password: any, passwordU: string) => {
    return await bcrypt.compare(password, passwordU)
}
