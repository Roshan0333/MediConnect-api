const express = require("express");
const cors = require('cors');
const dbConnection = require("./db/dbConnection");
const cookieParser = require("cookie-parser");
const {RemoveCookies} = require("./utilites/cookie/Cookie")
require('dotenv').config();

const PORT = 3000;

// const PORT = process.env.PORT

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


dbConnection();

app.use("/mediconnect/auth", require("./Route/End_UserRoute/auth"));
app.use("/mediconnect/booking", require("./Route/End_UserRoute/booking"));
app.use("/mediconnect/user/userprofile", require("./Route/End_UserRoute/userProfile"));
app.use("/mediconnect/doctor/auth", require("./Route/DoctorRoute/DoctorAuth"));
app.use("/mediconnect/doctor/profile", require("./Route/DoctorRoute/DoctorProfileRoute"));
app.use("/mediconnect/doctor/available", require("./Route/DoctorRoute/AvailableRoute"));
app.use("/mediconnect/doctor/appointment", require("./Route/DoctorRoute/DoctorAppointmentRoute"));
app.use("/mediconnect/management/auth", require("./Route/CommonRoute/ManagementAuthRoute"));
app.use("/mediconnect/management/Report", require("./Route/CommonRoute/ReportRoute"));
app.use("/mediconnect/SearchBy", require("./Route/CommonRoute/Search"));

app.post("/mediconnect/signout", async (req,res) => {
    RemoveCookies(res);
})

app.listen(PORT, () => { console.log(`Server Is Running on ${PORT}`) })

