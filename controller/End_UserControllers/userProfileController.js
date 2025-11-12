const { UserProfile_Model } = require("../../models/End_User_Model/UserProfile.model");

const UserProfile_Controller = async (req, res) => {
    try {
        let { phone, street, nearby, city, state } = req.body;
        let { _id, name, email } = req.user;

        let UserProfil_Detail = UserProfile_Model({
            UserId: _id,
            UserName: name,
            UserEmail: email,
            Phone: phone,
            Address: {
                StreetName: street,
                NearBy: nearby,
                City: city,
                State: state
            }
        });

        await UserProfil_Detail.save();

        return res.status(200).json({ status: 200, msg: "Your Profile Saved Successfully" });

    }
    catch (err) {
        return res.status(500).json({ status: 500, error: err.message });
    }
}


const Update_UserProfile_Controller = async (req, res) => {
    try {
        let { phone, street, nearby, city, state } = req.body;
        let { _id, name, email } = req.user;

        await UserProfile_Model.findOneAndUpdate(
            { UserId: _id },
            {
                UserName: name,
                UserEmail: email,
                Phone: phone,
                Address: {
                    StreetName: street,
                    NearBy: nearby,
                    City: city,
                    State: state
                }
            }
        )

        return res.status(200).json({ status: 200, msg })
    }
    catch (err) {
        return res.status(500).json({ status: 500, error: err.message });
    }
}


module.exports = { UserProfile_Controller, Update_UserProfile_Controller };