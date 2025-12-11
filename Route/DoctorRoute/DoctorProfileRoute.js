const express = require("express");
const {CreateDoctorProfile, Get_DoctorProfile, Update_DoctorProfie, Get_DoctorProfileById} = require("../../controller/Doctor_Controller/DoctorProfileController");
const requiredLogin = require("../../middleware/requiredLogin");
const multer = require("multer")

const route = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage})

route.post("/DoctorProfile", upload.single("DoctorPhoto"), CreateDoctorProfile);
route.get("/GetDoctorProfile", requiredLogin, Get_DoctorProfile);
route.put("/UpdateDoctorProfile", requiredLogin, upload.single("DoctorPhoto"), Update_DoctorProfie);
route.get("/GetDoctorProfileById", Get_DoctorProfileById)

module.exports = route;