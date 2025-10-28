const express = require("express");
const {Management_Signup, Management_Login, Management_ForgetPassword} = require("../../controller/CommonController/ManagementController");
const Otp_Create = require("../../controller/CommonController/OptController")

let ManagementModel = require('../../models/Common_Model/Management.Model');

let route = express.Router();

let app = express();

app.use(express.json())


let DuplicateEmail = async (req, res, next) => {
    try {
        let duplicateResult = await ManagementModel.findOne({ Email: req.body.Email });

        if (!duplicateResult) {
            next();
        }
        else {
            return res.status(409).json({ msg: "Employee Already Exists" });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

let isEmail_Present_Not = async (req, res, next) => {
    try {
        let foundResult = await ManagementModel.findOne({ Email: req.body.Email });

        if (!foundResult) {
            return res.status(401).json({ msg: "User Not Found" });
        }
        else {
            next();
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

route.post("/Signup", Management_Signup);
route.post("/OTP", DuplicateEmail, Otp_Create)
route.post("/Login", isEmail_Present_Not, Management_Login);
route.post("/ForgetPassword/OTP", isEmail_Present_Not, Otp_Create);
route.post("/ForgetPassword", Management_ForgetPassword);

module.exports = route;
