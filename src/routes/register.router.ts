import { Router } from "express";
import registerRoute from '../apiservices/register/register.router'
import { validateRegister } from "../middlewares/validationMiddleware";

const router = Router();
router.use("/",registerRoute)
export default router;