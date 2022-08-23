const activitiesModels = require("../models/activitiesModels");

// ดึง activity มาทั้งหมด
const get_allAct = async (req, res) => {
  const act = await activitiesModels.find({user: req.user.id}).sort({ date: 1 });
  if (!act) {
    res.status(404).send("Not found, the resource does not exist");
  }
  res.send(act);
};

// ดึง activity มา 1 อัน
const get_soloAct = async (req, res) => {
  const Act = await activitiesModels.findById(req.params.activityId);
  if (!Act) {
    res.status(404).send("Not found, the resource does not exist");
  }
  res.send(Act);
};

// สร้าง activity
const create_Act = async (req, res) => {
  const act = await activitiesModels.create({
        user: req.user.id,
        ActType: req.body.ActType,
        hour: req.body.hour,
        minute: req.body.minute,
        date: req.body.date,
        description: req.body.description,
    });

    if (!act) {
        return res.status(400).send('Bad request')
    }
    await act.save();
    res.send(act)
}

const edit_Act = async (req, res) => {
  const user = await activitiesModels.findById(req.user.id)
  const Act = await activitiesModels.findByIdAndUpdate(
    req.params.activityId,
    req.body, {new :true}
  );
  if (!Act) {
    res.status(404).send("Not found, the resource does not exist");
  }
  res.status(200).json(edit_Act);
};

const delete_Act = async (req, res) => {
  const Act = await activitiesModels.findByIdAndDelete(req.params.activityId);
  if (!Act) {
    res.status(404).send("Not found, the resource does not exist");
  }
  res.status(204).send("Delete an activity");
};

const sumMonth = async (req, res) => {
  const user = req.user.id;
  const act = await activitiesModels.aggregate( 
        
    [
        { $match: {user: new mongoose.Types.ObjectId(user) }},
        { $group:
            { 
            _id: {user: "$user", month: { $month: "$date" }, type: "$ActType"},
            total_hour: { $sum: "$hour" },
            total_minute: { $sum: "$minute" },

        }},
        { $project: 
            {_id: 1,
            user:1,
            total_hour:1,
            total_minute: 1,
            total: { $sum: ["$total_minute",{ $multiply: [ "$total_hour", 60 ] }]}}}
    ]
);
  if (!act) {
    res.status(404).send("Not found, the resource does not exist");
  }
  res.send(act);
};

const sumWeek = async (req, res) => {
  const user = req.user.id;
    const act = await activitiesModels.aggregate([
      { $match: {user: new mongoose.Types.ObjectId(user) }},
      { $group:
          {
          _id: {user: "$user",week: {$floor: {$divide: [{$dayOfMonth: "$date"}, 7]}}, type: "$ActType"},
          total_hour: { $sum: "$hour" },
          total_minute: { $sum: "$minute" },
 
      }},
      { $project:
          {_id: 1,
            user:1,
          total_hour:1,
          total_minute: 1,
          total: { $sum: ["$total_minute",{ $multiply: [ "$total_hour", 60 ] }]}}}
  ])
    if (!act) {
      res.status(404).send("Not found, the resource does not exist");
    }
    res.send(act);
  };

module.exports = {
  get_allAct,
  get_soloAct,
  create_Act,
  edit_Act,
  delete_Act,
  sumMonth,
  sumWeek,
};
