const activitiesModels = require("../models/activitiesModels");

// ดึง activity มาทั้งหมด
const get_allAct = async (req,res,next) => {
    const act = await activitiesModels.find().sort({ date: 1 });
    if (!act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(act);
}

// ดึง activity มา 1 อัน
const get_soloAct = async (req,res,next) => {
    const Act = await activitiesModels.findById(req.params.activityId);
    if (!Act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(req.Act);
}

// สร้าง activity 
const create_Act = (req,res,next) => {
        const newAct = new activitiesModels(req.body);
        const validateResult = newAct.validateSync();
        if (validateResult) {
            return res.status(400).send('Bad request');
        }
        newAct.save((err,doc) => {
            if (err){
                return res.status(400).send(err);
            };
            res.status(201).send(doc);
        });
};

const edit_Act = async (req,res,next) => {
    const Act = await activitiesModels.findByIdAndUpdate(req.params.activityId, req.body);
    if (!Act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    await Act.save();
    res.send(req.body);
};

const delete_Act = async (req,res,next) => {
    const Act = await activitiesModels.findByIdAndDelete(req.params.activityId );
    if (!Act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.status(204).send("Delete an activity");
};

module.exports = {
    get_allAct,
    get_soloAct,
    create_Act,
    edit_Act,
    delete_Act,
};