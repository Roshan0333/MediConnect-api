const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserProfile_Schema = mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: "SignUp"
    },
    UserName: {
     type: String,
    },
    UserEmail: {
        type: String,
    },
    Phone: {
        type: Number,
        required: true
    },
    Address: [{
        StreetName: {
            type: String,
            required: true
        },
        NearaBy: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        },
        State: {
            type: String,
            required: true
        }
    }]
});

const UserProfile_Model = mongoose.model("User Profile", UserProfile_Schema);

module.exports = UserProfile_Model;