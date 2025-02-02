import { Router } from "express";
import orderRoute from '../apiservices/order/order.router'
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.use("/", authenticateJWT, orderRoute)

export default router;