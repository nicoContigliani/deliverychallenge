export const deletePassword = async (data: any) => {
    const updatedUser = { ...data };
    delete updatedUser.password;
    return updatedUser;
}