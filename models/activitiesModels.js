const mongoose = require('mongoose');


const activitiesSchema = mongoose.Schema({
    ActType:{
        enum:["Walking","Running","Hiking","Swimming","Riding bicycle"],
        type:String,
        require:true,   
    },
    hour:{
        type:Number,
        require:true,
    },
    minute:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
    description:{
        type:String,
        max:100,
    },
},
{
    versionKey: false
}
);

const activitiesModels = mongoose.model("activity", activitiesSchema);

module.exports = activitiesModels;