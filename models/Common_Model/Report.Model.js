const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

let Report_Schema = new mongoose.Schema({
    AppointmentId:{
        type:String,
    }, 
    AppointmentDate:{
        type:String,
        required:true
    },
    AppointmentTime:{
        type:String,
        required:true
    },
    PatientEmail:{
        type:String,
        required:true
    },
    DoctorEmail:{
        type:String,
        required:true
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