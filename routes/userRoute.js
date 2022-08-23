const express = require('express');
const userController = require('../controller/userController');
const userRouter = express.Router();
const activitiesRouter = require('./activitiesRoute');
const scheduleRouter = require('./scheduleRoute');

userRouter.post('/', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/me', userController.getMe);
userRouter.get('/me/activities',protect,activitiesRouter );
userRouter.get('/me/schedule',protect,scheduleRouter );

module.exports = userRouter;

