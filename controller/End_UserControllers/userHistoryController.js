const express = require("express");
const AppointmentModel = require("../../models/Appointment.model")
const DoctorAvailable = require("../../models/Doctor_Model/DoctorAvailable.model")
let app = express();

app.use(express.json());


const AppointmentBooking = async (req, res) => {
    try {

        const { DoctorName, DoctorId, AppointmentDate, AppointmentTime } = req.body;

        let AppointmentDetail = await AppointmentModel({
            UserID: req.user._id,
            DoctorName,
            DoctorId,
            AppointmentDate,
            AppointmentTime,
            AppointmentStatus: "Conform"
        })

        await DoctorAvailable.findOneAndUpdate(
            {DoctorId:DoctorId},
            {
                $set:{
                    "DoctorAvailable_Array.$[outer].Available.$[inner].Status": true
                }
            },
            {
                arrayFilters:[
                    {"outer.Date": AppointmentDate},
                    {"inner.time": AppointmentTime}
                ]
            }
        )

        await AppointmentDetail.save();

        return res.status(200).json({status:200, msg: "Appointment Booked Successfully" })

    }
    catch (err) {
        return res.status(500).json({status:500, error: err.message })
    }
}

const CancelAppointment = async (req, res) => {

    try {

        let {AppointmentId} = req.body;

        let UserAppointment = await AppointmentModel.findById({ _id: AppointmentId });


        if (UserAppointment.AppointmentStatus === "Conform") {
            UserAppointment.AppointmentStatus = "Cancelled";
            await UserAppointment.save();

            await DoctorAvailable.findOneAndUpdate(
                {DoctorId:UserAppointment.DoctorId},
                {
                    $set:{
                        "DoctorAvailable_Array.$[outer].Available.$[inner].Status":false
                    }
                },
                {
                    arrayFilters:[
                        {"outer.Date": UserAppointment.AppointmentDate},
                        {"inner.time": UserAppointment.AppointmentTime}
                    ]
                }
            )
            return res.status(200).json({ status:200, msg: "Appointment Cancel Successfully" })
        }
        else {
            return res.status(400).json({ status:400, msg: "Appointment are not Conform" })
        }
    }
    catch (err) {
        return res.status(500).json({ status:500, error: err.message })
    }
}


const UserAppointmentHistory = async (req, res) => {
    try {

        let AppointmentHistory = await AppointmentModel.find({ UserID: req.user._id });

        if (AppointmentHistory.length === 0) {
            return res.status(200).json({length:false, msg: "No Appointment History" })
        }
        else {
            return res.status(200).json({length:true, Data: AppointmentHistory })
        }
    }
    catch (err) {
        return res.status(500).json({ status:500, error: err.message });
    }
}

const CurrentAppointment = async (req, res) => {
    try {

        let allAppointment = await AppointmentModel.find({ UserID: req.user._id });

        let now = new Date();
        let currentAppointment = allAppointment.filter((appointment) => {

            let appointmentDate = appointment.AppointmentDate;
            let appointmentTime = appointment.AppointmentTime;

            let appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);

            return now <= appointmentDateTime;

        })

        if(!currentAppointment){
            return res.status(404).json({status:404, msg:"No Current Appointment Available"})
        }

        let conformAppointment = currentAppointment.filter((appointment) => {
            if (appointment.AppointmentStatus === "Conform") {
                return appointment
            }
        })

        return res.status(200).json({status:200, currentAppointment: conformAppointment })
    }
    catch (err) {
        return res.status(500).json({status:500, error: err.message })
    }
}

module.exports = { AppointmentBooking, CancelAppointment, UserAppointmentHistory, CurrentAppointment };