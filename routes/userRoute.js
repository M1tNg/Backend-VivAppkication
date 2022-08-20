const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
// userRouter.get("/logout", userController.logoutUser);

userRouter.get("/free-endpoint",userController.freeEndpoint);
userRouter.get("/auth-Endpoint", userController.authEndpoint)

module.exports = userRouter;