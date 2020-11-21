import { Router } from "express";
import User from "../controllers/User";

export default (userController: User, loginValidation: any, registerValidation: any) => {
    const router = Router();
    router.get("/", userController.getAll);
    router.get("/me", userController.getMe);
    router.get("/verify", userController.verify);
    router.get("/find", userController.findUser);
    router.get("/:id", userController.show);
    router.post("/", registerValidation, userController.createUser);
    router.delete("/:id", userController.deleteUser);
    router.post('/login', loginValidation, userController.login);
    return router;
}


