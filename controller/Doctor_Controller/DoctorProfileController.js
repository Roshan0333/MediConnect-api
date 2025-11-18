const DoctorProfileModel = require("../../models/Doctor_Model/DoctorProfile.model")
const DoctorModel = require("../../models/Doctor_Model/Doctor.model")

const CreateDoctorProfile = async (req, res) => {
    try{
            const {email,phone,age, degree, collageName, street, nearBy, pinCode, city, state, country}  = req.body;

            const profilePhoto = (req.file)?req.file.buffer.toString("base"):null;

            const doctorDetail = await DoctorModel.findOne({email: email});

            if(!doctorDetail){
                return res.status(404).json({status: 404, msg:"Email Not Found"});
            }

            DoctorProfileModel({
                DoctorId: doctorDetail._id,
                DoctorPhoto: profilePhoto,
                DoctorName: doctorDetail.doctorName,
                DoctorEmail: email,
                DoctorPhone: phone,
                DoctorExperience: doctorDetail.experience,
                DoctorSpecialization: doctorDetail.specialization,
                DoctorAge: age,
                DoctorDegree: degree,
                CollageName: collageName,
                Fee: doctorDetail.fee,
                Address:{
                    Street: street,
                    NearBy: nearBy,
                    PinCode: pinCode,
                    City: city,
                    State: state,
                    Country: country
                }

            })
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message})
    }
}


const Get_DoctorProfile = async (req, res) => {
    try{
        const {_id} = req.user;

        const doctorDetail = await DoctorProfileModel.findOne({DoctorId: _id});

        return res.status(200).json({status: 200, doctorDetail: doctorDetail});
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message})
    }
}

const Update_DoctorProfie = async (req, res) => {
    try{
        const {phone,age, degree, collageName, street, nearBy, pinCode, city, state, country}  = req.body;

        const {_id} = req.user;

        const doctorDetail = await DoctorProfileModel.findOneAndUpdate(
            {DoctorId: _id}, {
                DoctorPhoto: profilePhoto,
                DoctorName: doctorDetail.doctorName,
                DoctorPhone: phone,
                DoctorExperience: doctorDetail.experience,
                DoctorSpecialization: doctorDetail.specialization,
                DoctorAge: age,
                DoctorDegree: degree,
                CollageName: collageName,
                Fee: doctorDetail.fee,
                Address:{
                    Street: street,
                    NearBy: nearBy,
                    PinCode: pinCode,
                    City: city,
                    State: state,
                    Country: country
                }
            });
    }
    catch(err){
        return res.status(500).json({status: 500, error: err.message})
    }
}

module.exports = {CreateDoctorProfile, Get_DoctorProfile, Update_DoctorProfie};