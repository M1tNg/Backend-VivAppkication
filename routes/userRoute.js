const express = require('express');
const router = express.Router();
const activitiesRouter = require('./activitiesRoute');
const scheduleRouter = require('./scheduleRoute');
const {protect} = require("../middleware/jwtMiddleware");
const {  registerUser,
    loginUser,
    getMe } = require("../controller/userController");


router.post('/', registerUser);
router.post('/login',loginUser);
router.get('/me', getMe);
router.use('/me/activities',protect,activitiesRouter );
router.use('/me/schedule',protect,scheduleRouter );

module.exports = router;

