const express = require('express');
const activitiesRouter = express.Router();

const activitiesController = require('../controller/activitiesController');

activitiesRouter.get("/", activitiesController.get_allAct);
activitiesRouter.get("/:activityId", activitiesController.get_soloAct);
activitiesRouter.post("/create", activitiesController.create_Act);
activitiesRouter.put("/:activityId", activitiesController.edit_Act);
activitiesRouter.delete("/:activityId", activitiesController.delete_Act);
activitiesRouter.post("/summaryMonth", activitiesController.sumMonth);

module.exports = activitiesRouter;