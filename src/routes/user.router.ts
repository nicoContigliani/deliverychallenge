import { Router } from "express";
import userRoute from '../apiservices/user/user.router'
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.use("/", authenticateJWT, userRoute)

export default router;