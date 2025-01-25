import { Router } from "express";
import registerRoute from '../apiservices/register/register.router'

const router = Router();

router.use("/",registerRoute)

export default router;