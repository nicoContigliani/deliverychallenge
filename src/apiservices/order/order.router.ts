import { Router } from "express";
import {
  getOrdersController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getOrderByIdController,
  createBulkOrdersController
} from './order.controllers';

const router = Router();

router.get('/:userId', getOrdersController);
router.post('/:userId', createOrderController);
router.put('/:id/:userId', updateOrderController);
router.delete('/:id/:userId', deleteOrderController);
router.get('/:id/:userId', getOrderByIdController);
router.post('/bulk/:userId', createBulkOrdersController);

export default router;