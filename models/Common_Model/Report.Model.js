const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

let Report_Schema = new mongoose.Schema({
    AppointmentId:{
        type:String,
    }, 
    FileName:{
        type:String,
        required:true
    },
    AppointmentDate:{
        type:String,
        required:true
    },
    AppointmentTime:{
        type:String,
        required:true
    },
    PatientId:{
        type:String,
    },
    PatientName:{
        type: String,
    },
    DoctorId:{
        type:String,
    },
    DoctorName:{
        type:String,
    },
    DoctorSpecialization:{
        type:String,
    },
    UploadedBy:{
        type:ObjectId,
        ref:"Management"
    },
    Report:{
        type:String,
        required:true
    }
});

const ReportModel = mongoose.model("Report", Report_Schema);

module.exports = ReportModel;