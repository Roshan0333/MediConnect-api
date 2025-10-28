const express = require("express");
let ReportModel = require("../../models/Common_Model/Report.Model");
let AppointmentModel = require("../../models/Common_Model/Appointment.model");
let UserModel = require("../../models/End_User_Model//User.model");
let DoctorModel = require("../../models/Doctor_Model/Doctor.model")

let app = express();

app.use(express.json());


let ReportUpload = async (req, res) => {
    try {

        let { PatientEmail, DoctorEmail, AppointmentDate, AppointmentTime } = req.body;

        let User = await UserModel.findOne({email:PatientEmail});
        let Doctor = await DoctorModel.findOne({email:DoctorEmail});

        let PatientId = User._id;
        let DoctorId = Doctor._id;

        let Appointment = await AppointmentModel.findOne({UserId:PatientId, DoctorId:DoctorId, AppointmentDate, AppointmentTime})

        let AppointmentId = Appointment._id;

        let ReportBase64 = req.file ? req.file.buffer.toString("base64") : null;

        let ReportDetail = await ReportModel({
            AppointmentId,
            PatientEmail,
            DoctorEmail,
            UploadedBy: await req.user._id,
            Report: await ReportBase64
        })

        await ReportDetail.save();

        return res.status(200).json({ msg: "Report Uploaded Successfully", Report: ReportBase64 });

    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}

module.exports = ReportUpload;