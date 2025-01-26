import { Order } from '../../entities/Order';
import { AppDataSource } from '../../db';
import { Item } from '../../entities/Item';

// 1. Get order of a user
export const getOrdersDao = async (userId: number): Promise<Order[]> => {
  console.log("🚀 ~ getOrdersDao ~ userId:", userId);
  const orderRepository = AppDataSource.getRepository(Order);
  const orders = await orderRepository.find({
    where: { user: { id: userId }, isDeleted: false },
    relations: ['user', 'items'],
  });
  console.log("🚀 ~ getOrdersDao ~ orders:", orders);

  return orders;
};

// 2. Get order by id
export const getOrderByIdDao = async (id: number, userId: number): Promise<Order | null> => {
  const orderRepository = AppDataSource.getRepository(Order);
  return await orderRepository.findOne({
    where: { id, user: { id: userId } },
    relations: ['user', 'orderItems'],
  });
};

// 3. Create a new order
export const createOrderDao = async (newOrder: Partial<Order>, userId: number, itemIds: number[]): Promise<Order> => {
  const orderRepository = AppDataSource.getRepository(Order);

  // Fetch the items based on the provided itemIds
  const items = await AppDataSource.getRepository(Item).findByIds(itemIds);

  // Create the order and associate the items
  const order = orderRepository.create({
    ...newOrder, 
    user: { id: userId },
    items, 
  });

  // Save the order along with its associated items
  return await orderRepository.save(order);
};


// 4. Update an existing order
export const updateOrderDao = async (id: number, updatedOrder: Partial<Order>, userId: number): Promise<Order | null> => {
  const orderRepository = AppDataSource.getRepository(Order);

  // Find the order by ID and user
  const order = await orderRepository.findOne({
    where: { id, user: { id: userId } },
    relations: ['items'],
  });

  if (!order) {
    return null;
  }

  // Update the order
  Object.assign(order, updatedOrder);

  if (updatedOrder.items) {
    order.items = updatedOrder.items;
  }


  return await orderRepository.save(order);
};


// 5. Delete an order by ID
export const deleteOrderDao = async (id: number, userId: number): Promise<Order | null> => {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = await orderRepository.findOne({
    where: { id, user: { id: userId } },
  });

  if (!order) {
    return null;
  }

  // Mark the order as deleted
  order.isDeleted = true;

  // Save the updated order
  return await orderRepository.save(order);
};



//  Get order status
export const getOrderStatusDao = async (id: number): Promise<string | null> => {
  console.log(`Attempting to fetch order status for ID: ${id}`);
  const orderRepository = AppDataSource.getRepository(Order);

  try {
    const order = await orderRepository.findOne({
      where: { id, isDeleted: false },
      select: ['status'],
    });
    console.log("Retrieved order:", order);

    if (!order) {
      console.log(`No order found for ID: ${id}`);
      return null;
    }

    console.log(`Returning status: ${order.status}`);
    return order.status;
  } catch (error) {
    console.error("Error in getOrderStatusDao:", error);
    throw error; // Re-throw the error to be caught in the controller
  }
};