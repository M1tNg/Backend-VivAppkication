const userModels = require("../models/userModels");

// ดึง activity มาทั้งหมด
const get_allAct = async (req,res,next) => {
    const userId = req.user.id;
    const user = await userModels.findById(userId);
    const act = await user.activities.find().sort({ date: 1 });
    if (!act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(act);
}

// ดึง activity มา 1 อัน
const get_soloAct = async (req,res,next) => {
    const userId = req.user.id;
    const user = await userModels.findById(userId);
    const Act = await user.activities.findById(req.params.activityId);
    if (!Act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    res.send(req.Act);
}

// สร้าง activity 
const create_Act = (req,res,next) => {
    const userId = req.user.id;
    const user = await userModels.findById(userId);
        const newAct = new user.activities(req.body);
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
    const userId = req.user.id;
    const user = await userModels.findById(userId);
    const Act = await user.activities.findById(req.params.activityId);
    if (!Act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    const {ActType,hour,minute,date,description} = req.body;

    if (ActType) req.Act.ActType = ActType;
    if (hour) req.Act.hour = hour;
    if (minute) req.Act.minute = minute;
    if (date) req.Act.date = date;
    if (description) req.Act.description = description;

    await req.Act.save();
    res.send(req.Act);
};

const delete_Act = async (req,res,next) => {
    const userId = req.user.id;
    const user = await userModels.findById(userId);
    const Act = await user.activities.findById(req.params.activityId);
    if (!Act) {
        res.status(404).send('Not found, the resource does not exist')
    }
    await req.Act.remove();
    res.status(204).send();
};

module.exports = {
    get_allAct,
    get_soloAct,
    create_Act,
    edit_Act,
    delete_Act,
};