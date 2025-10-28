const express = require("express");
const {AppointmentBooking, UserAppointmentHistory, CurrentAppointment, CancelAppointment} = require("../../controller/End_UserControllers/userHistoryController");
const requiredLogin = require("../../middleware/requiredLogin");

const route = express.Router();

route.post("/AppointmentBooking", requiredLogin, AppointmentBooking);
route.get("/AppointmentHistory", requiredLogin, UserAppointmentHistory);
route.post("/CurrentAppointment", requiredLogin, CurrentAppointment)
route.put("/CancelAppointment", requiredLogin, CancelAppointment);


module.exports = route