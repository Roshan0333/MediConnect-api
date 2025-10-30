let SignUp_Model = require("../../models/End_User_Model/User.model");
const { passwordEncrypt, passwordDecrypt } = require("../../utilites/password_Encrypt_Decrypt/index")
const jwtToken_Create = require("../../utilites/jwt/index");
const Cookies = require("../../utilites/cookie/Cookie")

//! Signup Api
let Signup_Controller = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let encryptPassword = await passwordEncrypt(password)

        let User = await SignUp_Model({
            name: name,
            email: email,
            password: encryptPassword,
        })

        await User.save();

        let { accessToken, refreshToken } = jwtToken_Create(User);

        Cookies(res,"AccessToken", accessToken, 15*60*1000);
        Cookies(res,"RefreshToken",refreshToken,30*24*60*60*1000);


        return res.status(200).json({ status: 200, msg: "User Add Successfully"})

    }
    catch (err) {
        return res.status(500).json({ status: 500, msg: err.message })
    }
};


//! login Api
let Login_Controller = async (req, res) => {

    try {
        const { email, password } = req.body;
        let User = await SignUp_Model.findOne({ email })

        if (User === null) {
            return res.status(404).json({ status: 404, msg: "User Not Found" })
        }

        let hashPassword = User.password;
        let passwordCompare = await passwordDecrypt(password, hashPassword)

        if (!passwordCompare) {
            return res.status(401).json({ status: 401, msg: "Incorrect Password" })
        }
        else {
            User.password = undefined;
            let {accessToken, refreshToken} = jwtToken_Create(User)

            Cookies(res,"AccessToken", accessToken, 15*60*1000);
            Cookies(res,"RefreshToken", refreshToken, 30*24*60*60*1000)

            return res.status(200).json({ status: 200, msg: "Login SuccessFul"})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, error: err.message });
    }
};


//! Login Api by token
let LoginByToken = (req, res) => {
    try {
        return res.status(200).json({ status: 200, msg: "Access Granted" })
    }
    catch (err) {
        return res.status(500).json({ status: 500, error: err.message })
    }
}


//! Forget Password Api
let ForgetPassword_Controller = async (req, res) => {
    try {

        let { email, password } = req.body;

        let encryptPassword = await passwordEncrypt(password)

        let UserDetail = await SignUp_Model.findOneAndUpdate({ email: email },
            { password: encryptPassword }
        );

        if (UserDetail === null) {
            return res.status(404).json({ status: 404, msg: "User Not Found" })
        }

        UserDetail.password = undefined
        let {accessToken, refreshToken} = jwtToken_Create(UserDetail);

        Cookies(res, "AccessToken", accessToken, 15*60*1000);
        Cookies(res,"RefreshToken", refreshToken, 30*24*60*60*1000)

        return res.status(200).json({ status: 200, msg: "Password Updates Successfully"})
    }
    catch (err) {
        return res.status(500).json({ status: 500, msg: err.message });
    }
};


module.exports = { Signup_Controller, Login_Controller, LoginByToken, ForgetPassword_Controller };