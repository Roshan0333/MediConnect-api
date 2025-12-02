const AppointmentModel = require("../../models/Common_Model/Appointment.model");


const TodayAppointment = async (req,res) => {
    try{
        const {_id} = req.user;
        const {todayDate} = req.query;

        const todayAppointmentData = await AppointmentModel.find({
            DoctorId: _id,
            AppointmentDate: todayDate,
            AppointmentStatus: "Conform"
        });

        if(todayAppointmentData.length === 0){
            return res.status(404).json({status: 404, msg: "Today no Appointment"})
        }

        return res.status(200).json({status: 200, Appointment: todayAppointmentData});

    }
    catch (err){
        return res.status(500).json({status: 500, error: err.message})
    }
}


const FutureAppointment = async (req, res) => {
    try{

        const {_id} = req.user;
        const {todayDate} = req.query;

        const futureAppointmentData = await AppointmentModel.find({
            DoctorId: _id,
            AppointmentDate: {$gte: todayDate},
            AppointmentStatus: "Conform"
        })

        if(futureAppointmentData.length === 0){
            return res.status(404).json({status: 404, msg: "No Appointment"});
        }

        return res.status(200).json({status: 200, msg: futureAppointmentData})
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message})
    }
}

const AppointmentHistory = async (req, res) => {
    try{
        const {_id} = req.user;

        const appointmentHistoryData = await AppointmentModel.find({
            DoctorId: _id
        })

        if(appointmentHistoryData.length === 0){
            return res.status(404).json({status: 404, msg: "No Appointment"});
        }

        return res.status(200).json({status: 200, appointmentHistoryData: appointmentHistoryData});
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message});
    }
}


module.exports = {TodayAppointment, FutureAppointment, AppointmentHistory};