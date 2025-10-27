const mongoose = require("mongoose");

const Doctor_Schema = new mongoose.Schema({
    doctorName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    specialization:{
        type:String
    },
    experience:{
        type:Number
    },
    fee:{
        type:Number
    }
})


const DoctorModel = mongoose.model("Doctor", Doctor_Schema);

module.exports = DoctorModel;