import { Router } from "express";
import { 
    // deleteUsersController, getOneUsersController, getUserSController,
     postLoginController, 
    //  putUsersController
     } from "./login.controllers";

const router = Router();

// router.get ("/", getUserSController)

router.post("/", postLoginController)

// router.put("/:id", putUsersController)

// router.delete("/:id", deleteUsersController)

// router.get("/:id", getOneUsersController)


export default router;