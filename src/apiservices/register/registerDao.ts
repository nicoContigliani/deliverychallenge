import { User } from '../../entities/Users';
import { AppDataSource } from '../../db';

// 1. Obtener todos los usuarios
export const getDao = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const data= await userRepository.find();
  console.log("🚀 ~ getDao ~ data:", data)
  
  return data;
};

// 2. Obtener un usuario por ID
export const getIdDao = async (id: number): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOne({ where: { id } });
};

// 3. Crear un nuevo usuario
export const postDao = async (newUser: Partial<User>): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(newUser);
  return await userRepository.save(user);
};

// 4. Actualizar un usuario existente
export const updateDao = async (id: number, updatedUser: Partial<User>): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return null;
  }

  Object.assign(user, updatedUser);
  return await userRepository.save(user);
};

// 5. Eliminar un usuario por ID
export const deletesDao = async (id: number): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    return false;
  }

  await userRepository.remove(user);
  return true;
};

// 6. Insertar varios usuarios a la vez (Bulk insert)
export const postBulkDao = async (users: Partial<User>[]): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const userInstances = userRepository.create(users);
  return await userRepository.save(userInstances);
};