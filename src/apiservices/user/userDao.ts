import { User } from '../../entities/Users';
import { AppDataSource } from '../../db';

// 1. Retrieve all users
export const getDao = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const data = await userRepository.find();
  console.log("🚀 ~ getDao ~ data:", data);

  return data;
};

// 2. Retrieve a user by ID
export const getIdDao = async (id: number): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOne({ where: { id } });
};

// 3. Create a new user
export const postDao = async (newUser: Partial<User>): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(newUser);
  return await userRepository.save(user);
};

// 4. Update an existing user
export const updateDao = async (id: number, updatedUser: Partial<User>): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return null;
  }

  Object.assign(user, updatedUser);
  return await userRepository.save(user);
};

// 5. Delete a user by ID
export const deletesDao = async (id: number): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return false;
  }

  await userRepository.remove(user);
  return true;
};

// 6. Insert multiple users at once (Bulk insert)
export const postBulkDao = async (users: Partial<User>[]): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const userInstances = userRepository.create(users);
  return await userRepository.save(userInstances);
};

// 7. Retrieve a user by email
export const getByEmailDao = async (email: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });
  return user;
};
