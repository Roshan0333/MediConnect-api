const mongoose = require("mongoose");

let Management_Schema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Position:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Address:[
        {type:String,
        required:true}
    ],
})

let ManagementModel = mongoose.model("Management", Management_Schema);

module.exports = ManagementModel;