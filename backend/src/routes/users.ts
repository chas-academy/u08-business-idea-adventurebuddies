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
  getFriends,
  searchUsers,
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

userRouter.get("/search", auth, async (req, res) => {
  await searchUsers(req, res);
});

userRouter.get("/:id/events", auth, getUserEvents);

userRouter.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.status(200).json(user);
});

userRouter.get("/", auth, async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

userRouter.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    let userData = req.body;

    // Kollar om det finns en uppladad fil (vi använder multer för filuppladningar)
    if (req.file) {
      userData.profileImageUrl = req.file.filename; // Tilldela sökvägen till profileImageUrl
    }

    const updatedUser = await updateUser(id, userData);

    res.status(200).json({ message: "Update succeeded", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRouter.delete("/me", auth, deleteOwnAccount);

userRouter.delete("/:id", auth, admin, async (req, res) => {
  const id = req.params.id;
  const deletedUser = await deleteUser(id);
  res.status(200).json({ message: "User deleted", deletedUser });
});

userRouter.get("/:id/friends", auth, getFriends); // example route in insomnia: http://localhost:3000/api/users/66565815996906b11ee4ae26/friends

export default userRouter;
