const express = require("express");
let ManagementModel = require("../models/Management.Model");
let jwtToken_Create = require("../utilites/jwt/index")
let { passwordEncrypt, passwordDecrypt } = require("../utilites/password_Encrypt_Decrypt");

let app = express();

app.use(express.json());

let Management_Signup = async (req, res) => {
    try {
        let { UserName, Position, Email, Password, Phone, Address } = req.body;

        let EmployeeDetail = await ManagementModel({
            UserName,
            Position,
            Email,
            Password: await passwordEncrypt(Password),
            Phone,
            Address: Array.isArray(Address) ? Address : [Address]
        });

        await EmployeeDetail.save();

        EmployeeDetail.Password = undefined;
        EmployeeDetail.Phone = undefined;
        let token = await jwtToken_Create(EmployeeDetail)
        return res.status(200).json({ msg: "New Employee Regested Successfully", token: token });
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}

let Management_Login = async (req, res) => {
    try {
        let { Email, Password } = req.body;

        let EmployeeDetail = await ManagementModel.findOne({ Email: Email });

        let encryptPassword = EmployeeDetail.Password;

        let passwordResult = passwordDecrypt(Password, encryptPassword)

        if (!passwordResult) {
            return res.status(401).json({ msg: "Incorrect Password" });
        }
        else {
            EmployeeDetail.Password = undefined;
            EmployeeDetail.Phone = undefined;
            let token = await jwtToken_Create(EmployeeDetail)
            return res.status(200).json({ msg: "Access Granted" });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


let Management_ForgetPassword = async (req, res) => {
    try {
        let { Email, Password } = req.body;

        await ManagementModel.findOneAndUpdate({ Email: Email },
            { Password: passwordEncrypt(Password) });

        return res.status(200).json({ msg: "Email Password Change Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { Management_Signup, Management_Login, Management_ForgetPassword };