const express = require("express");
const { Doctor_Signup, Doctor_Login, Doctor_LoginByToken, DoctorList, Doctor_ForgetPassword, UpdateDoctorFee } = require("../../controller/Doctor_Controller/authController");
const requiredLogin = require("../../middleware/requiredLogin");
const DoctorModel = require("../../models/Doctor_Model/Doctor.model");

let route = express.Router();


const isEmail_Present_Not = async (req, res, next) => {
    try {
        let email = req.body.email;

        let result = await DoctorModel.findOne({ email: email });

        if (!result) {
            return res.status(400).json({ msg: "Email Not Found" })
        }
        else {
            next()
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}


const Email_Duplicate = async (req, res, next) => {
    try {
        let email = req.body.email;

        let Check_EmailDuplicate = await DoctorModel.findOne({ email: email });

        if (Check_EmailDuplicate) {
            return res.status(400).json({ msg: "Email Already Available" })
        }
        else {
            next()
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


route.post("/Signup", Email_Duplicate, Doctor_Signup);
route.post("/Login", isEmail_Present_Not, Doctor_Login);
route.post("/LoginByToken", requiredLogin, Doctor_LoginByToken);
route.post("/forgetPassword", Doctor_ForgetPassword);
route.get("/List", DoctorList);
route.put("/DoctorFee", UpdateDoctorFee)


module.exports = route;