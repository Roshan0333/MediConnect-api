const express = require("express");
let  { SearchBy_DoctorId, SearchBy_Date, SearchBy_DateAndTime, SearchBy_DoctorNameAndDate, SearchBy_SpecializationAndDate, SearchBy_DoctorNameAndDateAndTime, SearchBy_DoctorNameAndSpecializationAndDate, SearchBy_SpecializationAndDateAndTime, SearchBy_DoctorNameAndSpecializationAndDateAndTime } = require("../../controller/SearchController");

let route = express.Router();


route.get("/DoctorId", SearchBy_DoctorId);
route.get('/Date', SearchBy_Date);
route.get("/DateAndTime", SearchBy_DateAndTime);
route.get("/DoctorNameAndDate", SearchBy_DoctorNameAndDate);
route.get("/SpecializationAndDate", SearchBy_SpecializationAndDate);
route.get("/DoctorNameAndDateAndTime", SearchBy_DoctorNameAndDateAndTime);
route.get("/DoctorNameAndSpecializationAndDate", SearchBy_DoctorNameAndSpecializationAndDate);
route.get("/SpecializationAndDateAndTime", SearchBy_SpecializationAndDateAndTime);
route.get("/DoctorNameAndSpecializationAndDateAndTime", SearchBy_DoctorNameAndSpecializationAndDateAndTime);

module.exports = route;