const mongoose = require('mongoose');


const activitiesSchema = mongoose.Schema({
    act_type:{
        enum:["Walking","Running","Hiking","Swimming","Riding bicycle"],
        type:String,
        require:true,   
    },
    duration:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
    description:{
        type:String
    },
},
{
    versionKey: false
}
);

const activitiesModels = mongoose.model("activity", activitiesSchema);

module.exports = activitiesModels;