import { Router } from "express";
import {
  getOrdersController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrderStatusController
} from './order.controllers';
import { validateOrderCreate, validateOrderUpdate } from "../../middlewares/validationMiddleware";

const router = Router();

router.get('/:userId', getOrdersController);
router.post('/:userId', validateOrderCreate, createOrderController);
router.put('/:id/:userId', validateOrderUpdate, updateOrderController);
router.delete('/:id/:userId', deleteOrderController);
router.get('/:id/status', getOrderStatusController);
router.get('/:id/:userId', getOrderByIdController);


export default router;