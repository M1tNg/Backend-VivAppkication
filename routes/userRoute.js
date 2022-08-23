const express = require('express');
const userController = require('../controller/userController');
const userRouter = express.Router();
const activitiesRouter = require('./activitiesRoute');
const scheduleRouter = require('./scheduleRoute');
const {protect} = require("../middleware/jwtMiddleware");

userRouter.post('/', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/me', userController.getMe);
userRouter.use('/me/activities',protect,activitiesRouter );
userRouter.use('/me/schedule',protect,scheduleRouter );

module.exports = userRouter;

