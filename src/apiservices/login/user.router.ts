import { Router } from "express";
import { deleteUsersController, getOneUsersController, getUserSController, postUsersController, putUsersController } from "./user.controllers";

const router = Router();

router.get ("/", getUserSController)

router.post("/", postUsersController)

router.put("/:id", putUsersController)

router.delete("/:id", deleteUsersController)

router.get("/:id", getOneUsersController)


export default router;