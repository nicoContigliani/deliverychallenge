import { Router } from "express";
import {
    postLoginController,
} from "./login.controllers";

const router = Router();

router.post("/", postLoginController)

export default router;