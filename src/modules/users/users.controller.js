import { Router } from "express";
import { createOrUpdate, getUserByEmail, getUserById, signup } from "./users.service.js";
const userRouter = Router();
userRouter.post("/signup", signup);
userRouter.put("/:id",createOrUpdate)
userRouter.get("/by-email", getUserByEmail);
userRouter.get("/:id", getUserById);
export default userRouter;
