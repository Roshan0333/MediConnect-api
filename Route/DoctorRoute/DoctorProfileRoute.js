const express = require("express");
const {CreateDoctorProfile, Get_DoctorProfile, Update_DoctorProfie} = require("../../controller/Doctor_Controller/DoctorProfileController");
const requiredLogin = require("../../middleware/requiredLogin");

const route = express.Router();

route.post("/DoctorProfile", CreateDoctorProfile);
route.get("/GetDoctorProfile", requiredLogin, Get_DoctorProfile);
route.put("/UpdateDoctorProfile", requiredLogin, Update_DoctorProfie);

module.exports = route;