const express = require("express");
const { DoctorAvailable_DeleteDate, DoctorAvailable_Post, DoctorAvailable_EditTime} = require("../../controller/Doctor_Controller/DoctorAvailableController");
const requiredLogin = require("../../middleware/requiredLogin")

const route = express.Router();

route.post("/AddAvailable", requiredLogin, DoctorAvailable_Post)
route.put("/DeleteDate", requiredLogin, DoctorAvailable_DeleteDate);
route.post("/EditTime", requiredLogin, DoctorAvailable_EditTime);


module.exports = route;