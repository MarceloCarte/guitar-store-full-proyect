import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { editUser, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/users", verifyToken ,(req, res) => res.send("Get ALL users"));
userRouter.get("/users/:id", verifyToken, getUser);

userRouter.put("/users/:id", verifyToken, editUser);


export default userRouter;
