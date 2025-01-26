import { Router } from "express";
import {
    postLoginController,
} from "./login.controllers";
import { validateLogin } from "../../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateLogin, postLoginController)

export default router;