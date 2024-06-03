import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserEvents,
  deleteOwnAccount,
} from "../controllers/usercontroller";
import { IUser } from "../interfaces/IUser";
import { auth, admin, CustomRequest } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const userData: Partial<IUser> = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    description: req.body.description,
    phoneNumber: req.body.phoneNumber,
    profileImageUrl: req.body.profileImageUrl,
    role: req.body.role,
  };
  console.log(req.body);

  const registeredUser = await registerUser(userData);
  if (registeredUser.error) {
    return res.status(400).json({
      error: registeredUser.error,
    });
  }
  return res.status(201).json(registeredUser);
});

userRouter.post("/login", async (req, res) => {
  const userData: Partial<IUser> = {
    email: req.body.email,
    password: req.body.password,
  };
  const loggedInUser = await loginUser(userData);
  if (loggedInUser?.error) {
    return res.status(400).json({
      error: loggedInUser.error,
    });
  }
  return res.status(200).json(loggedInUser);
});

// Logout user
userRouter.post("/logout", auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  }
  userRouter.get("/me", auth, async (req: CustomRequest, res) => {
    return res.status(200).json({
      user: req.user,
    });
  });

  return res.status(200).json({
    message: "User logged out successfully.",
  });
});

// Logout user from all devices
userRouter.post("/logoutall", auth, async (req: CustomRequest, res) => {
  if (req.user) {
    req.user.tokens = [];
    await req.user.save();
  }
  return res.status(200).json({
    message: "User logged out from all devices successfully.",
  });
});

userRouter.get("/:id/events", auth, getUserEvents);

userRouter.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.status(200).json(user);
});

userRouter.get("/", auth, admin, async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

userRouter.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const updatedUser = await updateUser(id, req.body);
  res.status(200).json({ message: "Update succeeded", updatedUser });
});

userRouter.delete("/me", auth, deleteOwnAccount);

userRouter.delete("/:id", auth, admin, async (req, res) => {
  const id = req.params.id;
  const deletedUser = await deleteUser(id);
  res.status(200).json({ message: "User deleted", deletedUser });
});

export default userRouter;
