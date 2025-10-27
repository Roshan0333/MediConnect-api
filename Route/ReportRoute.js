const express = require("express");
const ReportUpload = require("../controller/ReportController");
const multer = require("multer");
const SignUp_Model = require("../models/End_User.Model/User.model");
const DoctorModel = require('../models/Doctor_Model/Doctor.model');
const requiredLogin = require("../middleware/requiredLogin");

let route = express.Router();


let app = express();

app.use(express.json())

let isEmail_Present_Not = async (req, res, next) => {

    try {
        const { PatientEmail, DoctorEmail} = req.body;

        let Patient = await SignUp_Model.findOne({ email: PatientEmail });
        let Doctor = await DoctorModel.findOne({ email: DoctorEmail });

        if (!Patient) {
            return res.status(401).json({ msg: "Patient Not Found"});
        }
        else {
            if (!Doctor) {
                return res.status(401).json({ msg: "Doctor Not Found" })
            }
            else {
                next()

            };
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message, })
    }
}



let storage = multer.memoryStorage();
let upload = multer({ storage });


route.post("/ReportUpload",requiredLogin, upload.single("Report"), isEmail_Present_Not, ReportUpload)

module.exports = route