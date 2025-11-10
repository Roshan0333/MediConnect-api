const express = require("express");
const DoctorModel = require("../../models/Doctor_Model/Doctor.model");
const { passwordEncrypt, passwordDecrypt } = require("../../utilites/password_Encrypt_Decrypt/index");
const jwtToken_Create = require("../../utilites/jwt/index");
const {Cookies} = require("../../utilites/cookie/Cookie")


const app = express();
app.use(express.json());


let Doctor_Signup = async (req, res) => {
    try {
        const { doctorName, email, password, specialization, experience, fee } = req.body;

        let DoctorDetail = await DoctorModel({
            doctorName,
            email,
            password: await passwordEncrypt(password),
            specialization,
            experience, 
            fee
        })

        await DoctorDetail.save();

        DoctorDetail.password = undefined;

        let {accessToken, refreshToken} = jwtToken_Create(DoctorDetail);

        Cookies(res,"AccessToken", accessToken, 15*60*1000);
        Cookies(res, "RefreshToken", refreshToken, 30*24*60*60*1000);

        return res.status(200).json({ status:200,message: "Doctor Add Successfully"});
    }
    catch (err) {
        return res.status(500).json({ status:500, error: err.message });
    }
}

let Doctor_Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let DoctorDetail = await DoctorModel.findOne({ email: email });

        if(DoctorDetail === null){
            return res.status(404).json({status:404, message:"User Not Found"})
        }

        let encryptPassword = DoctorDetail.password;

        let passwordCompare = passwordDecrypt(password, encryptPassword);

        if (!passwordCompare) {
            return res.status(401).json({ status:401, message: "Incorrect Password" })
        }
        else {
            DoctorDetail.password = undefined;

            let {accessToken, refreshToken} = jwtToken_Create(DoctorDetail);
            
            Cookies(res,"AccessToken", accessToken, 15*60*1000);
            Cookies(res, "RefreshToken", refreshToken, 30*24*60*60*1000);

            return res.status(200).json({ status:200, message: "Access Granted"})
        }
    }
    catch (err) {
        return res.status(500).json({ status:500, error: err.message });
    }
}


let Doctor_ForgetPassword = async (req,res) => {
    try{

        let {email, password} = req.body;

        let DoctorDetail = await DoctorModel.findOne({email:email});

        if(DoctorDetail === null){
            return res.status(404).json({status:404, message: "User Not Found"});
        }

        let UpdateDetail = await DoctorModel.findByIdAndUpdate(
            {_id:DoctorDetail._id},
            {password: passwordEncrypt(password)}
        );

        UpdateDetail.password = undefined;

        let {accessToken, refreshToken} = jwtToken_Create(UpdateDetail);

        Cookies(res,"AccessToken", accessToken, 15*60*1000);
        Cookies(res,"RefreshToken", refreshToken, 30*24*60*60*1000);

        return res.status(200).json({status:200, message:"Password Updated Successfully",});
    }
    catch(err){
        return res.status(500).json({status:500, error: err.message})
    }
}


let DoctorList = async (req, res) => {
    try {
        let DoctorLists = await DoctorModel.find();
        return res.status(200).json({Doctors:DoctorLists})
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


let UpdateDoctorFee = async (req,res) => {
    try{
        const {email, fee} = req.body;

        let doctorDetail = await DoctorModel.findByIdAndUpdate(
            {email: email}, 
            {fee:fee})

        if(!doctorDetail){
            return res.status(404).json({status:404, msg: "Doctor Email not Found in Database"})
        }
        else{
            return res.status(200).json({status: 200, msg: "Doctor Fee Updated Successfully"})
        }
        
    }
    catch(err){
        return res.status(500).json({status:500, msg:err.message})
    }
}


module.exports = { Doctor_Signup, Doctor_Login, DoctorList, Doctor_ForgetPassword, UpdateDoctorFee };