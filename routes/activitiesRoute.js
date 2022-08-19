const express = require('express');
const activitiesRouter = express.Router();

const activitiesController = require('../controller/activitiesController');

const activitiesModels = require('../models/activitiesModels')

activitiesRouter.param("activityId", async (req,res,next,id) => {
    const Act = await activitiesModels.findById(id);
    if(!Act) {
        return res.status(404).send();
    };

    req.Act = Act;
    next();
}); 

activitiesRouter.get("/", activitiesController.get_allAct);
activitiesRouter.get("/:activityId", activitiesController.get_soloAct);
activitiesRouter.post("/create", activitiesController.create_Act);
activitiesRouter.put("/:activityId", activitiesController.edit_Act);
activitiesRouter.delete("/:activityId", activitiesController.delete_Act);

module.exports = activitiesRouter;