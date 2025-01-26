import { Router } from "express";
import { postUsersController } from "./register.controllers";
import { validateRegister } from "../../middlewares/validationMiddleware";
const router = Router();

router.post("/", validateRegister, postUsersController)

export default router;