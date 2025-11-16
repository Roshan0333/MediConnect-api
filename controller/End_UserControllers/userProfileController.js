const { UserProfile_Model } = require("../../models/End_User_Model/UserProfile.model");

const UserProfile_Controller = async (req, res) => {
    try {
        let { phone, street, nearby, pincode, city, state } = req.body;
        let { _id, name, email } = req.user;
        let profilePhoto =req.file?req.file.buffer.toString("base64"):null;

        let UserProfil_Detail = UserProfile_Model({
            UserId: _id,
            ProfilePhoto: profilePhoto,
            UserName: name,
            UserEmail: email,
            Phone: phone,
            Address: {
                StreetName: street,
                NearBy: nearby,
                PinCode: pincode,
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


const Get_UserProfile_Controller = async (req, res) => {
    try{
        const {_id} = req.user;

        const userDetail = await UserProfile_Model.findOne({UserId:_id});

        return res.status(200).json({status: 200, userDetail: userDetail})
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message})
    }
}

const Update_UserProfile_Controller = async (req, res) => {
    try {
        let {name, phone, street, nearby, pincode, city, state } = req.body;
        let { _id } = req.user;

        let profilePhoto = req.file?req.file.buffer.toString("base64"):null;

        await UserProfile_Model.findOneAndUpdate(
            { UserId: _id },
            {
                ProfilePhoto: profilePhoto,
                UserName: name,
                Phone: phone,
                Address: {
                    StreetName: street,
                    NearBy: nearby,
                    PinCode: pincode,
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


module.exports = { UserProfile_Controller, Get_UserProfile_Controller, Update_UserProfile_Controller };