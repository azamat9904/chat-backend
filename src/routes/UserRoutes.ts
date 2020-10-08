import { Router } from "express";
import { userController } from "../controllers/index";

const router = Router();
router.get("/", userController.getAll);
router.get("/:id", userController.show);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

export default router;
