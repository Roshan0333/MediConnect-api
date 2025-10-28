const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

let AppointmentScheme = mongoose.Schema({
    UserID: {
        type:ObjectId,
        ref:"SignUp",
    },
    DoctorName: {
        type : String,
        required:true
    },
    DoctorId:{
        type:String,
        required:true
    },
    AppointmentDate:{
        type:String,
        required:true
    },
    AppointmentTime:{
        type:String,
        required:true
    },
    AppointmentStatus : {
        type: String,
        required:true
    },
    PaymentStatus:{
        type: String,
        default : false
    }
})

const AppointmentModel = mongoose.model("AppointmentBooked", AppointmentScheme);

module.exports = AppointmentModel;