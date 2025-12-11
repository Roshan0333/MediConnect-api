const express = require("express");
let ReportModel = require("../../models/Common_Model/Report.Model");
let AppointmentModel = require("../../models/Common_Model/Appointment.model");
let UserModel = require("../../models/End_User_Model//User.model");
let DoctorModel = require("../../models/Doctor_Model/Doctor.model")

let app = express();

app.use(express.json());


let ReportUpload = async (req, res) => {
    try {

        let { PatientEmail, DoctorEmail, AppointmentDate, AppointmentTime, FileName } = req.body;

        let User = await UserModel.findOne({email:PatientEmail});
        let Doctor = await DoctorModel.findOne({email:DoctorEmail});
        
        let PatientId = User._id;
        let PatientName = User.name;

        let DoctorId = Doctor._id;
        let DoctorName = Doctor.doctorName;
        let DoctorSpecialization = Doctor.specialization;

        let Appointment = await AppointmentModel.findOne({PatientID:PatientId, DoctorId:DoctorId, AppointmentDate, AppointmentTime})

        let AppointmentId = Appointment._id;

        let ReportBase64 = req.file ? req.file.buffer.toString("base64") : null;

        let ReportDetail = await ReportModel({
            AppointmentId,
            FileName,
            AppointmentDate,
            AppointmentTime,
            PatientId,
            PatientName,
            DoctorId,
            DoctorName,
            DoctorSpecialization,
            UploadedById: req.user._id,
            UploadedBy: req.user.UserName,
            Report: await ReportBase64
        })

        await ReportDetail.save();

        return res.status(200).json({ status:200, msg: "Report Uploaded Successfully"});

    }
    catch (err) {
        return res.status(500).json({status:500, error: err.message })
    }

}


let ReportGetByPatient = async (req,res) => {
    try{
            let {_id} = req.user;

            let reportFind_ByPatient = await ReportModel.find({PatientId:_id});

            if(reportFind_ByPatient.length === 0){
                return res.status(404).json({status:404, msg: "No Record Found"});
            }
            
            return res.status(200).json({status:200, Reports: reportFind_ByPatient});
    }
    catch (err){
        return res.status(500).json()
    }

}

let ReportGetByDoctor = async (req, res) => {
    try{
        let {_id} = req.user;

        let reportFind_ByDoctor = await ReportModel.find({DoctorId: _id});

        if(reportFind_ByDoctor.length === 0) {
            return res.status(404).json({status: 404, msg: "No Record Found."})
        }

        return res.status(200).json({status: 200, Reports: reportFind_ByDoctor})
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message})
    }
}

module.exports = {ReportUpload, ReportGetByPatient, ReportGetByDoctor};;