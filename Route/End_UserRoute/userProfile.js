const express = require("express");
const requiredLogin = require("../../middleware/requiredLogin");
const {UserProfile_Controller, Update_UserProfile_Controller} = require('../../controller/End_UserControllers/userProfileController');

const route = express.Router();

route.post("UserProfile", requiredLogin, UserProfile_Controller);
route.put("Update_UserProfile", requiredLogin, Update_UserProfile_Controller);

module.exports = route;
