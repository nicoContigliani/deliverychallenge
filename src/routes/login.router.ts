import { Router } from "express";
import loginRoute from '../apiservices/login/login.router'
import { validateLogin } from "../middlewares/validationMiddleware";

const router = Router();
router.use("/", loginRoute)
export default router;