import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usercontroller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", addUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;