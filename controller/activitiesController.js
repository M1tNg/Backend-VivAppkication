const activitiesModels = require("../models/activitiesModels");

// ดึง activity มาทั้งหมด
const get_allAct = async (req,res,next) => {
    const act = await activitiesModels.find();
    res.send(act);
}

// ดึง activity มา 1 อัน
const get_soloAct = async (req,res,next) => {
    res.send(req.Act);
}

// สร้าง activity 
const create_Act = (req,res,next) => {
        const newAct = new activitiesModels({
            ...req.body,
        });
        newAct.save((err,doc) => {
            if (err){
                return res.status(400).send(err);
            };
            res.status(201).send(doc);
        });
};

const edit_Act = async (req,res,next) => {
    const {act_type,duration,date,description} = req.body;

    if (act_type) req.Act.act_type = act_type;
    if (duration) req.Act.duration = duration;
    if (date) req.Act.date = date;
    if (description) req.Act.description = description;

    await req.Act.save();
    res.send(req.Act);
};

const delete_Act = async (req,res,next) => {
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