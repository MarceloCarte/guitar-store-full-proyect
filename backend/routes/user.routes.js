import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", /* {auth} */ (req, res) => res.send("Get ALL users"));
userRouter.get("/users/:id", (req, res) => res.send("Get user"));

userRouter.put("/users/:id", (req, res) => res.send("Update user"));

userRouter.delete("/users/:id", (req, res) => res.send("Delete user"));

export default userRouter;
