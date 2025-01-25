import { Router } from "express";
import { postUserController, getUserController, putUserController, deleteUserController, getOneUserController } from "../controllers/user.controllers";
import loginRoute from '../apiservices/login/login.router'

const router = Router();
router.use("/", loginRoute)
export default router;