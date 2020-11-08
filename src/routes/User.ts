import { Router } from "express";
import User from "../controllers/User";

export default (userController: User) => {
    const router = Router();
    router.get("/", userController.getAll);
    router.get("/me", userController.getMe);
    router.get("/:id", userController.show);
    router.post("/", userController.createUser);
    router.delete("/:id", userController.deleteUser);
    router.post('/login', userController.login);
    return router;
}


