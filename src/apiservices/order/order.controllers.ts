import { Request, Response } from "express";
import {
  getOrdersDao,
  getOrderByIdDao,
  createOrderDao,
  updateOrderDao,
  deleteOrderDao,
  createBulkOrdersDao,
  getOrderStatusDao
} from './orderDao'; 

// 1. Get orders of a user
export const getOrdersController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 
  try {
    const orders = await getOrdersDao(Number(userId));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

// 2. Get order by id
export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { items, totalAmount, status } = req.body;

  // Extract item IDs from `items` (assuming 'items' is an array of objects with IDs)
  const itemIds = items.map((item: { id: number }) => item.id);

  try {
    // Pass the three parameters: newOrder, userId, and itemIds
    const newOrder = await createOrderDao({ totalAmount, status }, Number(userId), itemIds);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// 3. Create a new order
export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.params; // order id and userId
  const { items, totalAmount, status } = req.body;

  try {
    const updatedOrder = await updateOrderDao(Number(id), { items, totalAmount, status }, Number(userId));

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// 4. Update an existing order
export const deleteOrderController = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.params; // order id and userId

  try {
    const deleted = await deleteOrderDao(Number(id), Number(userId));
    if (deleted) {
      res.status(200).json({ message: "Order successfully deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

// 5. Delete an order by ID
export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.params; // order id and userId

  try {
    const order = await getOrderByIdDao(Number(id), Number(userId));
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order", error });
  }
};



export const getOrderStatusController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log(`Received request for order status. ID: ${id}`);

  if (isNaN(Number(id))) {
    console.log(`Invalid ID received: ${id}`);
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  try {
    const status = await getOrderStatusDao(Number(id));
    if (!status) {
      console.log(`Order not found for ID: ${id}`);
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    console.log(`Returning status for order ${id}: ${status}`);
    res.status(200).json({ status });
  } catch (error) {
    console.error('Error in getOrderStatusController:', error);
    res.status(500).json({ 
      message: 'Error retrieving order status', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
