const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const DoctorAvailable_Schema = new mongoose.Schema({
    DoctorId:{
        type:ObjectId,
        ref:"Doctor",
        require:true,
        unique:true
    },
    DoctorAvailable_Array:[
      {Date:{
        type:String,
        require:true,
      },
    Available:[
        {time:{type:String, require:true},
        Status:{type:Boolean, default:false},
      }
      ]
    }
    ]
})

const DoctorAvailable_Model = mongoose.model("DoctorAvailable", DoctorAvailable_Schema);

module.exports = DoctorAvailable_Model;