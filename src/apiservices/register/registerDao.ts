import { User } from '../../entities/Users';
import { AppDataSource } from '../../db';


export const postDao = async (newUser: Partial<User>): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(newUser);
  return await userRepository.save(user);
};

