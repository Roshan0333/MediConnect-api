const express = require("express");
const { Signup_Controller, Login_Controller, LoginByToken, ForgetPassword_Controller } = require("../../controller/End_UserControllers/authController");
const Otp_Create= require("../../controller/CommonController/OptController")

const requiredLogin = require("../../middleware/requiredLogin");
const SignUp_Model = require("../../models/End_User_Model/User.model");

const route = express.Router();

route.use(express.json());


const isEmail_Present_Not = async (req, res, next) => {

    try {
        let userEmail = req.body.email;

        let result = await SignUp_Model.findOne({ email: userEmail });

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


const DuplicateEmail = async (req, res, next) => {
    try {
        let userEmail = req.body.email;

        let result = await SignUp_Model.findOne({ email: userEmail });

        if (!result) {
            next()
        }
        else {
            return res.status(401).json({status:401, msg: "User Already Reregister" });
        }
    }
    catch (err) {
        return res.status(500).json({status:500, error: err.message });
    }
}


route.post("/Signup", Signup_Controller);

route.post("/Login", isEmail_Present_Not, Login_Controller);

route.post("/LoginByToken", requiredLogin, LoginByToken)

route.put("/forgetPassword", ForgetPassword_Controller);

route.post("/forgetPassword/Otp", isEmail_Present_Not, Otp_Create)

route.post("/Otp", DuplicateEmail, Otp_Create);



module.exports = route;