import { Router } from "express";
import { 
    // deleteUsersController, 
    // getOneUsersController, 
    // getUserSController, 
    postUsersController, 
    // putUsersController 
} from "./register.controllers";

const router = Router();

router.post("/", postUsersController)

export default router;