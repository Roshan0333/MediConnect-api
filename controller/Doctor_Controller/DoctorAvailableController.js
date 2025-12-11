const express = require('express');
const DoctorAvailable_Model = require("../../models/Doctor_Model/DoctorAvailable.model");

const app = express();

app.use(express.json());


let DoctorAvailable_Post = async (req, res) => {
    try {
        const { Date, AvailableArray } = req.body;

        let doctorDate = await DoctorAvailable_Model.findOne({ DoctorId: req.user._id });

        if (!doctorDate) {
            let DoctorAvailable = await DoctorAvailable_Model({
                DoctorId: req.user._id,
                DoctorAvailable_Array: { Date: Date, Available: AvailableArray }
            }
            );
            await DoctorAvailable.save();

            res.status(200).json({ status: 200, msg: "Data Created Successfully" })
        } else {

            let datePresent_OrNot = await DoctorAvailable_Model.findOne({
                DoctorId: req.user._id,
                "DoctorAvailable_Array.Date": Date
            })

            if (!datePresent_OrNot) {
                await DoctorAvailable_Model.findOneAndUpdate(
                    { DoctorId: req.user._id },
                    { $push: { DoctorAvailable_Array: { Date: Date, Available: AvailableArray } } }

                )

                res.status(200).json({ status: 200, msg: 'Doctor Available Data Update Successfully' })
            } else {
                res.status(200).json({ status: 200, msg: 'Already Available' })
            }
        }
    }
    catch (err) {

        return res.status(500).json({ status: 500, error: err.message })
    }
}


let DoctorAvailable_DeleteDate = async (req, res) => {
    try {
        const { Date } = req.body;

        await DoctorAvailable_Model.findOneAndUpdate(
            { DoctorId: req.user._id },
            { $pull: { DoctorAvailable_Array: { Date: Date } } }
        )

        res.status(200).json({ status: 200, msg: 'Doctor Available Data Update Successfully' })
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err.message })
    }
}


let DoctorAvailable_EditTime = async (req, res) => {
    try {
        const { Date, AvailableTimeArray } = req.body;

        await DoctorAvailable_Model.findOneAndUpdate(
            { DoctorId: req.user._id, "DoctorAvailable_Array.Date": Date },
            { $set: { "DoctorAvailable_Array.$.Available": AvailableTimeArray } },
        )

        res.status(200).json({ status: 200, msg: 'Doctor Available Data Update Successfully' })

    }
    catch (err) {
        res.status(500).json({ status: 500, error: err.message });
    }
}


let DoctorAvailable_Get = async (req, res) => {
    try {
        const { availableDate } = req.query;

        let availableDetail = await DoctorAvailable_Model.findOne({
            DoctorId: req.user._id,
            DoctorAvailable_Array: { $elemMatch: { Date: availableDate } }
        },
            {
                "DoctorAvailable_Array.$": 1
            });

        if (!availableDetail || availableDetail === null) {
            return res.status(404).json({ status: 404, msg: "Appointment is not Available on this Date" })
        }

        return res.status(200).json({ status: 200, AvailableDetail: availableDetail })

    }
    catch (err) {
        return res.status(500).json({ status: 500, error: err.msg })
    }
}



module.exports = { DoctorAvailable_Post, DoctorAvailable_DeleteDate, DoctorAvailable_EditTime, DoctorAvailable_Get };