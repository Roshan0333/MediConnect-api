const express = require("express");
const {AppointmentBooking, UserAppointmentHistory, CurrentAppointment, CancelAppointment, PreviousDoctor} = require("../../controller/End_UserControllers/userHistoryController");
const requiredLogin = require("../../middleware/requiredLogin");

const route = express.Router();

route.post("/AppointmentBooking", requiredLogin, AppointmentBooking);
route.get("/AppointmentHistory", requiredLogin, UserAppointmentHistory);
route.get("/CurrentAppointment", requiredLogin, CurrentAppointment)
route.put("/CancelAppointment", requiredLogin, CancelAppointment);
route.get("/PreviousDoctor", requiredLogin, PreviousDoctor);


module.exports = route