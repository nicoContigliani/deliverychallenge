import { Router } from "express";
import { postUserController, getUserController, putUserController, deleteUserController, getOneUserController } from "../controllers/user.controllers";
import userRoute from '../apiservices/user/user.router'
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.use("/", authenticateJWT, userRoute)

export default router;