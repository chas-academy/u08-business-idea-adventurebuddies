"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", async (req, res) => {
    const userData = {
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
    const registeredUser = await (0, usercontroller_1.registerUser)(userData);
    if (registeredUser.error) {
        return res.status(400).json({
            error: registeredUser.error,
        });
    }
    return res.status(201).json(registeredUser);
});
userRouter.post("/login", async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
    };
    const loggedInUser = await (0, usercontroller_1.loginUser)(userData);
    if (loggedInUser?.error) {
        return res.status(400).json({
            error: loggedInUser.error,
        });
    }
    return res.status(200).json(loggedInUser);
});
// Logout user
userRouter.post("/logout", auth_1.auth, async (req, res) => {
    if (req.user) {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
    }
    userRouter.get("/me", auth_1.auth, async (req, res) => {
        return res.status(200).json({
            user: req.user,
        });
    });
    return res.status(200).json({
        message: "User logged out successfully.",
    });
});
// Logout user from all devices
userRouter.post("/logoutall", auth_1.auth, async (req, res) => {
    if (req.user) {
        req.user.tokens = [];
        await req.user.save();
    }
    return res.status(200).json({
        message: "User logged out from all devices successfully.",
    });
});
userRouter.get("/:id", auth_1.auth, async (req, res) => {
    const id = req.params.id;
    const user = await (0, usercontroller_1.getUser)(id);
    res.status(200).json(user);
});
userRouter.get("/", auth_1.auth, auth_1.admin, async (req, res) => {
    const users = await (0, usercontroller_1.getAllUsers)();
    res.status(200).json(users);
});
userRouter.put("/:id", auth_1.auth, async (req, res) => {
    const id = req.params.id;
    const updatedUser = await (0, usercontroller_1.updateUser)(id, req.body);
    res.status(200).json({ message: "Update succeeded", updatedUser });
});
userRouter.delete("/:id", auth_1.auth, auth_1.admin, async (req, res) => {
    const id = req.params.id;
    const deletedUser = await (0, usercontroller_1.deleteUser)(id);
    res.status(200).json({ message: "User deleted", deletedUser });
});
exports.default = userRouter;
