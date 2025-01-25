import { Router } from "express";
import loginRoute from '../apiservices/login/login.router'

const router = Router();
router.use("/", loginRoute)
export default router;