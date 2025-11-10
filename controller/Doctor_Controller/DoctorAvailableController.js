const express = require('express');
const DoctorAvailable_Model = require("../../models/Doctor_Model/DoctorAvailable.model");

const app = express();

app.use(express.json());

let DoctorAvailable_Post = async (req, res) => {
    try {
        const { Date, AvailableArray } = req.body;
        let DoctorAvailable = await DoctorAvailable_Model({
            DoctorId: req.user._id,
            DoctorAvailable_Array: { Date: Date, Available: AvailableArray}
        }
        );
        await DoctorAvailable.save();

        res.status(200).json({ msg: "Data Created Successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

let DoctorAvailable_AddDate = async (req, res) => {
    try {

        const { Date, AvailableArray } = req.body;

        await DoctorAvailable_Model.findOneAndUpdate(
            {DoctorId: req.user._id},
            {$push:{DoctorAvailable_Array: { Date: Date, Available: AvailableArray }}}

        )

        res.status(200).json({ msg:'Doctor Available Data Update Successfully', id: req.user._id})
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


let DoctorAvailable_DeleteDate = async (req, res) => {
    try {
        const { Date } = req.body;

        await DoctorAvailable_Model.findOneAndUpdate(
            {DoctorId:req.user._id},
            {$pull:{DoctorAvailable_Array:{Date:Date}}}
        )

        res.status(200).json({ message: 'Doctor Available Data Update Successfully' })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}


let DoctorAvailable_AddTime = async (req,res) => {
    try{
        const {Date,Time} = req.body;

    await DoctorAvailable_Model.findOneAndUpdate(
        {DoctorId:req.user._id, "DoctorAvailable_Array.Date":Date},
        { $push: { "DoctorAvailable_Array.$.Available": { time: Time, Status: false } } }
    )

    res.status(200).json({msg:'Doctor Available Data Update Successfully'})

    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

let DoctorAvailable_DeleteTime = async (req,res) => {
    try{
        const {Date, Time} = req.body;

        await DoctorAvailable_Model.findOneAndUpdate(
            {DoctorId:req.user._id, "DoctorAvailable_Array.Date":Date},
            {$pull:{"DoctorAvailable_Array.$.Available":{time:Time}}}
            
        );

        res.status(200).json({msg:'Doctor Available Data Update Successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}


module.exports = { DoctorAvailable_Post, DoctorAvailable_AddDate, DoctorAvailable_DeleteDate, DoctorAvailable_AddTime, DoctorAvailable_DeleteTime};