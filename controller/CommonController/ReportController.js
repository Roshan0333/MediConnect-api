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

        let Appointment = await AppointmentModel.findOne({UserID:PatientId, DoctorId:DoctorId, AppointmentDate, AppointmentTime})

        let AppointmentId = Appointment._id;

        console.log(AppointmentId)

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
            UploadedById: await req.user._id,
            UploadedBy: await req.user.UserName,
            Report: await ReportBase64
        })

        await ReportDetail.save();

        return res.status(200).json({ status:200, msg: "Report Uploaded Successfully", Report: ReportBase64 });

    }
    catch (err) {
        return res.status(500).json({status:500, error: err.message })
    }

}


let ReportGet = async (req,res) => {
    try{
            let {_id} = req.user;

            let requestFrom = "Patient";

            let reportFind_ByPatient = await ReportModel.find({PatientId:_id});

            let reportFind_ByDoctor = await ReportModel.find({DoctorId:_id});

            if(reportFind_ByPatient.length !== 0 && reportFind_ByDoctor.length === 0){
                return res.status(200).json({status:200, Reports: reportFind_ByPatient, RequestFrom: requestFrom});
            }
            else if(reportFind_ByPatient.length === 0 && reportFind_ByDoctor.length !== 0){
                requiredFrom = "Doctor";
                return res.status(200).json({status:200, Reports: reportFind_ByDoctor, RequestFrom: requestFrom});
            }
            else{
                return res.status(200).json({status:204, msg: "No Record Found"});
            }
    }
    catch (err){
        return res.status(500).json()
    }

}

module.exports = {ReportUpload, ReportGet};;