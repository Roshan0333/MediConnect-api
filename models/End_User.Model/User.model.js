const mongoose = require("mongoose");
const collection = "SignUp";

const SignUp_Scheme = mongoose.Schema(
    {
        name: {
            type:String,
            required: true
        },
        email: {
            type:String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required:true
        }
    },collection
)

const SignUp_Model = mongoose.model("SignUp", SignUp_Scheme);

module.exports = SignUp_Model;