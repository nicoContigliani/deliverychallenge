import { Request, Response } from "express";
import {
  getOrdersDao,
  getOrderByIdDao,
  createOrderDao,
  updateOrderDao,
  deleteOrderDao,
  createBulkOrdersDao,
  getOrderStatusDao
} from './orderDao'; // Asegúrate de ajustar la ruta

// 1. Obtener todos los pedidos de un usuario
export const getOrdersController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; // Se espera que el userId se pase como parámetro
  console.log("🚀 ~ getOrdersController ~ userId:", userId)
  try {
    const orders = await getOrdersDao(Number(userId));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};

// 2. Crear un nuevo pedido
export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; // Se espera que el userId se pase como parámetro
  const { items, totalAmount, status } = req.body;

  // Aquí extraemos los IDs de los ítems desde `items` (suponiendo que 'items' es un arreglo de objetos con IDs)
  const itemIds = items.map((item: { id: number }) => item.id);

  try {
    // Ahora pasamos los tres parámetros: newOrder, userId y itemIds
    const newOrder = await createOrderDao({ totalAmount, status }, Number(userId), itemIds);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error });
  }
};


// 3. Actualizar un pedido existente
export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.params; // id del pedido y userId
  const { items, totalAmount, status } = req.body;

  try {
    const updatedOrder = await updateOrderDao(Number(id), { items, totalAmount, status }, Number(userId));

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

// 4. Eliminar un pedido por ID
export const deleteOrderController = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.params; // id del pedido y userId

  try {
    const deleted = await deleteOrderDao(Number(id), Number(userId));
    if (deleted) {
      res.status(200).json({ message: "Pedido eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pedido", error });
  }
};

// 5. Obtener un pedido por ID
export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id, userId } = req.params; // id del pedido y userId

  try {
    const order = await getOrderByIdDao(Number(id), Number(userId));
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

// 6. Crear varios pedidos a la vez
export const createBulkOrdersController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; // Se espera que el userId se pase como parámetro
  const { orders } = req.body;

  try {
    const newOrders = await createBulkOrdersDao(orders, Number(userId));
    res.status(201).json(newOrders);
  } catch (error) {
    res.status(500).json({ message: "Error al crear los pedidos", error });
  }
};


export const getOrderStatusController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log(`Received request for order status. ID: ${id}`);

  if (isNaN(Number(id))) {
    console.log(`Invalid ID received: ${id}`);
    res.status(400).json({ message: 'ID inválido' });
    return;
  }

  try {
    const status = await getOrderStatusDao(Number(id));
    if (!status) {
      console.log(`Order not found for ID: ${id}`);
      res.status(404).json({ message: 'Pedido no encontrado' });
      return;
    }
    console.log(`Returning status for order ${id}: ${status}`);
    res.status(200).json({ status });
  } catch (error) {
    console.error('Error in getOrderStatusController:', error);
    res.status(500).json({ 
      message: 'Error al consultar el estado del pedido', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
};