const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const DoctorProfile =  mongoose.Schema({
    DoctorId:{
        type:ObjectId,
        ref:"Doctor"
    },
    DoctorPhoto:{
        type:String
    },
    DoctorName:{
        type:String
    },
    DoctorEmail:{
        type: String,
        unique: true
    },
    DoctorPhone:{
        type: Number,
        unique: true
    },
    DoctorExperience:{
        type: Number
    },
    DoctorSpecialization:{
        type: String
    },
    DoctorAge:{
        type: Number
    },
    DoctorDegree:{
        type: String
    },
    CollageName:{
        type: String
    },
    Fee:{
        type: Number
    },
    Address:{
        Street:{
            type: String
        },
        NearBy:{
            type: String
        },
        PinCode: {
            type: Number
        },
        City:{
            type: String  
        },
        State:{
            type: String
        },
        Country: {
            type: String
        }
    }

})

const DoctorProfile_Model = mongoose.model("DoctorProfile", DoctorProfile)

module.exports = DoctorProfile_Model