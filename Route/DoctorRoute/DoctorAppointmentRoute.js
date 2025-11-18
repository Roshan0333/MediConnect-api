const express = require("express");
const {TodayAppointment, FutureAppointment, AppointmentHistory} = require("../../controller/Doctor_Controller/DoctorAppointmentController");
const requiredLogin = require("../../middleware/requiredLogin")

const route = express.Router();

route.get("/TodayAppointment", requiredLogin, TodayAppointment);
route.get("/FutureAppointment", requiredLogin, FutureAppointment);
route.get("/HistoryAppointment", requiredLogin, AppointmentHistory);

module.exports = route;
