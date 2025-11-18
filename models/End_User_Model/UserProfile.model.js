const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserProfile_Schema = mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: "SignUp"
    },
    ProfilePhoto:{
        type: String,
        unique: true
    },
    UserName: {
     type: String,
    },
    UserEmail: {
        type:String,
        unique: true
    },
    Phone: {
        type: Number,
        unique: true
    },
    UserAge:{
        type:Number
    },
    Address: {
        StreetName: {
            type: String,
        },
        NearBy: {
            type: String,
        },
        PinCode:{
            type: Number,
        },
        City: {
            type: String,
        },
        State: {
            type: String,
        }
    }
});

const UserProfile_Model = mongoose.model("User Profile", UserProfile_Schema);

module.exports = UserProfile_Model;