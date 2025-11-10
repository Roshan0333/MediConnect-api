let DoctorModel = require("../../models/Doctor_Model/Doctor.model");
let DoctorAvailable = require("../../models/Doctor_Model/DoctorAvailable.model");


let SearchBy_DoctorIdForAppointment = async (req, res) => {
    try {
        let { id, AppointmentDate } = req.query;

        let AppointmentList = await DoctorAvailable.findOne({
            DoctorId: id,
            "DoctorAvailable_Array.Date": AppointmentDate
        })

        if (!AppointmentList) {
            return res.status(404).json({ status: 404, msg: "No appointments found for the given date." });
        }


        let matchdDateAppointment = await AppointmentList.DoctorAvailable_Array.find(
            (item) => item.Date === AppointmentDate
        )

        return res.status(200).json({ status: 200, DoctorAvailable: matchdDateAppointment });

    }
    catch (err) {
        return res.status(500).json({ status: 500, error: err.message })
    }
}


let SearchBy_Date = async (req, res) => {
    try {
        let { AppointmentDate } = req.query;

        let AppointmentList = await DoctorAvailable.find({ "DoctorAvailable_Array.Date": AppointmentDate });

        let DoctorAvailableId = AppointmentList.map(doc => doc.DoctorId);

        if (DoctorAvailableId.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" });
        }

        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )

        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })


        return res.status(200).json({ status:200, msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

let SearchBy_DoctorNameAndDate = async (req, res) => {
    try {

        let { DoctorName, AppointmentDate } = req.query;

        let DoctorListByName = await DoctorModel.find({ doctorName: DoctorName });

        if (DoctorListByName.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found By Name" })
        }

        let DoctorId = DoctorListByName.map(doc => doc._id)

        let AppointmentList = await Promise.all(
            DoctorId.map(async (id) => {
                return await DoctorAvailable.findOne({
                    DoctorId: id,
                    "DoctorAvailable_Array.Date": AppointmentDate
                })
            }))


        let ValidAppointments = AppointmentList.filter((doc) => doc !== null && doc.DoctorId);

        if (ValidAppointments.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let DoctorAvailableId = ValidAppointments.map((doc) => doc.DoctorId);


        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )

        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


let SearchBy_DateAndTime = async (req, res) => {
    try {

        let { AppointmentDate, AppointmentTime } = req.query;

        let AppointmentList = await DoctorAvailable.find({
            "DoctorAvailable_Array.Date": AppointmentDate,
            "DoctorAvailable_Array.Available.time": AppointmentTime,
            "DoctorAvailable_Array.Available.Status": false
        })


        if (AppointmentList.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found by time" })
        }

        let DoctorAvailableId = AppointmentList.map(doc => doc.DoctorId);

        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )


        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

let SearchBy_SpecializationAndDate = async (req, res) => {
    try {
        let { Specialization, AppointmentDate } = req.query;

        let DoctorListBySpecialization = await DoctorModel.find({ specialization: Specialization });


        if (DoctorListBySpecialization.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found By Specialization" })
        }

        let DoctorIds = DoctorListBySpecialization.map(doc => doc._id);

        let AppointmentList = await Promise.all(
            DoctorIds.map(async (id) => {
                return await DoctorAvailable.findOne({
                    DoctorId: id,
                    "DoctorAvailable_Array.Date": AppointmentDate
                })
            })
        )

        let ValidAppointments = AppointmentList.filter(doc => doc !== null && doc.DoctorId);

        if (ValidAppointments.length === 0) {
            return res.status(404).json({ msg: "No doctors available on this date" });
        }

        let DoctorAvailableId = ValidAppointments.map(doc => doc.DoctorId);


        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )

        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })


    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

let SearchBy_DoctorNameAndSpecializationAndDate = async (req, res) => {
    try {

        let { DoctorName, Specialization, AppointmentDate } = req.query;

        let DoctorListByName = await DoctorModel.find({
            doctorName: DoctorName,
            specialization: Specialization
        });

        if (DoctorListByName.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found By Name" })
        }

        let DoctorIds = DoctorListByName.map(doc => doc._id);

        let AppointmentList = await Promise.all(
            DoctorIds.map(async (id) => {
                return await DoctorAvailable.findOne({
                    DoctorId: id,
                    "DoctorAvailable_Array.Date": AppointmentDate
                })
            })
        )

        let ValidAppointments = AppointmentList.filter((doc) => doc !== null && doc.DoctorId);

        if (ValidAppointments.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let DoctorAvailableId = ValidAppointments.map(doc => doc.DoctorId);

        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )

        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


let SearchBy_DoctorNameAndDateAndTime = async (req, res) => {

    try {
        let { DoctorName, AppointmentDate, AppointmentTime } = req.query;

        let DoctorListByName = await DoctorModel.find({ doctorName: DoctorName });

        if (DoctorListByName.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found By Name" })
        }

        let DoctorIds = DoctorListByName.map(doc => doc._id)

        let AppointmentList = await Promise.all(
            DoctorIds.map(async (id) => {
                return await DoctorAvailable.findOne({
                    DoctorId: id,
                    'DoctorAvailable_Array.Date': AppointmentDate,
                    "DoctorAvailable_Array.Available.time": AppointmentTime,
                    "DoctorAvailable_Array.Available.Status": false
                });
            }))


        if (AppointmentList.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let ValidAppointments = AppointmentList.filter((doc) => doc !== null && doc.DoctorId);

        if (ValidAppointments.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let DoctorAvailableId = ValidAppointments.map(doc => doc.DoctorId);

        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )


        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

let SearchBy_SpecializationAndDateAndTime = async (req, res) => {
    try {
        let { Specialization, AppointmentDate, AppointmentTime } = req.query;

        let DoctorListBySpecialization = await DoctorModel.find({ specialization: Specialization });

        if (DoctorListBySpecialization.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found By Specialization" })
        }

        let DoctorIds = DoctorListBySpecialization.map(doc => doc._id)

        let AppointmentList = await Promise.all(
            DoctorIds.map(async (id) => {
                return await DoctorAvailable.findOne({
                    DoctorId: id,
                    "DoctorAvailable_Array.Date": AppointmentDate,
                    "DoctorAvailable_Array.Available.time": AppointmentTime,
                    "DoctorAvailable_Array.Available.Status": false
                })
            })
        )

        if (AppointmentList.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let ValidAppointments = AppointmentList.filter((doc) => doc !== null && doc.DoctorId)

        if (ValidAppointments.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let DoctorAvailableId = ValidAppointments.map(doc => doc.DoctorId);

        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )

        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

let SearchBy_DoctorNameAndSpecializationAndDateAndTime = async (req, res) => {
    try {
        let { DoctorName, Specialization, AppointmentDate, AppointmentTime } = req.query;

        let DoctorListByName = await DoctorModel.find({
            doctorName: DoctorName,
            specialization: Specialization
        });

        if (DoctorListByName.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let DoctorIds = DoctorListByName.map(doc => doc._id);

        let AppointmentList = await Promise.all(
            DoctorIds.map(async (id) => {
                return await DoctorAvailable.find({
                    DoctorId: id,
                    "DoctorAvailable_Array.Date": AppointmentDate,
                    "DoctorAvailable_Array.Available.time": AppointmentTime,
                    "DoctorAvailable_Array.Available.Status": false
                })
            })
        )


        if (AppointmentList.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let ValidAppointments = AppointmentList.filter((doc) => doc !== null && doc.DoctorId);

        if (ValidAppointments.length === 0) {
            return res.status(404).json({ status: 404, msg: "No doctor found" })
        }

        let DoctorAvailableId = ValidAppointments.map(doc => doc.DoctorId);

        let DoctorList = await Promise.all(
            DoctorAvailableId.map(async (id) => {
                return await DoctorModel.findOne({
                    _id: id
                })
            })
        )

        let DoctorAvailableList = DoctorList.map((doc) => {
            doc.password = undefined;
            return doc;
        })

        return res.status(200).json({ msg: "Access Granted", DoctorAvailableList: DoctorAvailableList })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { SearchBy_DoctorIdForAppointment, SearchBy_Date, SearchBy_DateAndTime, SearchBy_DoctorNameAndDate, SearchBy_SpecializationAndDate, SearchBy_DoctorNameAndDateAndTime, SearchBy_DoctorNameAndSpecializationAndDate, SearchBy_SpecializationAndDateAndTime, SearchBy_DoctorNameAndSpecializationAndDateAndTime }