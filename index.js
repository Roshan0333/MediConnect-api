const express = require("express");
const cors = require('cors');
const dbConnection = require("./db/dbConnection");
const cookieParser = require("cookie-parser")
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

app.use("/appointment/auth", require("./Route/End_UserRoute/auth"));
app.use("/appointment/booking", require("./Route/End_UserRoute/booking"));
app.use("/appointment/user/userprofile", require("./Route/End_UserRoute/userProfile"));
app.use("/appointment/doctor/auth", require("./Route/DoctorRoute/DoctorAuth"));
app.use("/appointment/doctor/available", require("./Route/DoctorRoute/AvailableRoute"));
app.use("/appointment/management/auth", require("./Route/CommonRoute/ManagementAuthRoute"));
app.use("/appointment/management/Report", require("./Route/CommonRoute/ReportRoute"));
app.use("/appointment/SearchBy", require("./Route/CommonRoute/Search"));

app.listen(PORT, () => { console.log(`Server Is Running on ${PORT}`) })

