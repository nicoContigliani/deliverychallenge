import { Router } from "express";
import {
  getOrdersController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getOrderByIdController,
  createBulkOrdersController,
  getOrderStatusController
} from './order.controllers';

const router = Router();

router.get('/:userId', getOrdersController);
router.post('/:userId', createOrderController);
router.put('/:id/:userId', updateOrderController);
router.delete('/:id/:userId', deleteOrderController);
router.post('/bulk/:userId', createBulkOrdersController);
router.get('/:id/status', getOrderStatusController);
router.get('/:id/:userId', getOrderByIdController);


export default router;