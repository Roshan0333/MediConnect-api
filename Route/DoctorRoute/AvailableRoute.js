const express = require("express");
const {DoctorAvailable_AddDate, DoctorAvailable_DeleteDate, DoctorAvailable_Post, DoctorAvailable_AddTime, DoctorAvailable_DeleteTime} = require("../../controller/Doctor_Controller/DoctorAvailableController");
const requiredLogin = require("../../middleware/requiredLogin")

const route = express.Router();

route.post("/AddAvailable", requiredLogin, DoctorAvailable_Post)
route.put("/AddDate", requiredLogin, DoctorAvailable_AddDate);
route.put("/DeleteDate", requiredLogin, DoctorAvailable_DeleteDate);
route.put("/AddTime", requiredLogin, DoctorAvailable_AddTime);
route.put("/DeleteTime", requiredLogin, DoctorAvailable_DeleteTime)

module.exports = route;