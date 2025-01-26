import { User } from '../../entities/Users';
import { AppDataSource } from '../../db';

export const getByEmailDao = async (email: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });
  return user;
};