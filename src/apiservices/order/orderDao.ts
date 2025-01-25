import { Order } from '../../entities/Order';
import { AppDataSource } from '../../db';
import { Item } from '../../entities/Item';

// 1. Obtener todos los pedidos de un usuario
export const getOrdersDao = async (userId: number): Promise<Order[]> => {
  console.log("🚀 ~ getOrdersDao ~ userId:", userId);
  const orderRepository = AppDataSource.getRepository(Order);
  const orders = await orderRepository.find({
    where: { user: { id: userId } },
    relations: ['user', 'items'], // Cambia 'orderItems' a 'items'
  });
  console.log("🚀 ~ getOrdersDao ~ orders:", orders);
  
  return orders;
};

// 2. Obtener un pedido por ID
export const getOrderByIdDao = async (id: number, userId: number): Promise<Order | null> => {
  const orderRepository = AppDataSource.getRepository(Order);
  return await orderRepository.findOne({
    where: { id, user: { id: userId } }, // Asegura que el pedido pertenece al usuario
    relations: ['user', 'orderItems'],
  });
};

// 3. Crear un nuevo pedido
export const createOrderDao = async (newOrder: Partial<Order>, userId: number, itemIds: number[]): Promise<Order> => {
  const orderRepository = AppDataSource.getRepository(Order);

  // Fetch the items based on the provided itemIds
  const items = await AppDataSource.getRepository(Item).findByIds(itemIds);

  // Create the order and associate the items
  const order = orderRepository.create({
    ...newOrder, // Spread the newOrder
    user: { id: userId },
    items, // Add items explicitly
  });

  // Save the order along with its associated items
  return await orderRepository.save(order);
};


// 4. Actualizar un pedido existente
export const updateOrderDao = async (id: number, updatedOrder: Partial<Order>, userId: number): Promise<Order | null> => {
  const orderRepository = AppDataSource.getRepository(Order);
  
  // Buscar el pedido por id y userId
  const order = await orderRepository.findOne({
    where: { id, user: { id: userId } },
    relations: ['items'], // Asegúrate de traer la relación de items
  });

  if (!order) {
    return null;
  }

  // Actualiza las propiedades del pedido
  Object.assign(order, updatedOrder);

  // Si los ítems están incluidos en el body, actualízalos
  if (updatedOrder.items) {
    // Aquí, puedes asegurarte de que la relación de ítems se actualice correctamente
    order.items = updatedOrder.items;
  }

  // Guardar el pedido con las actualizaciones
  return await orderRepository.save(order);
};


// 5. Eliminar un pedido por ID
export const deleteOrderDao = async (id: number, userId: number): Promise<boolean> => {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = await orderRepository.findOne({
    where: { id, user: { id: userId } }, // Asegura que el pedido pertenece al usuario
  });

  if (!order) {
    return false;
  }

  await orderRepository.remove(order);
  return true;
};

// 6. Insertar varios pedidos a la vez (Bulk insert)
export const createBulkOrdersDao = async (orders: Partial<Order>[], userId: number): Promise<Order[]> => {
  const orderRepository = AppDataSource.getRepository(Order);
  const orderInstances = orders.map(order => ({ ...order, user: { id: userId } }));
  const bulkOrders = orderRepository.create(orderInstances);
  return await orderRepository.save(bulkOrders);
};

// 7. Obtener el estado de un pedido por ID
export const getOrderStatusDao = async (id: number, userId: number): Promise<string | null> => {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = await orderRepository.findOne({
    where: { id, user: { id: userId } },
  });

  if (!order) {
    return null;
  }

  return order.status;
};
