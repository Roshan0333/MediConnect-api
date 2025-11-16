const express = require("express");
const multer = require("multer");
const requiredLogin = require("../../middleware/requiredLogin");
const {UserProfile_Controller,Get_UserProfile_Controller, Update_UserProfile_Controller} = require('../../controller/End_UserControllers/userProfileController');

const route = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

route.post("UserProfile", requiredLogin, upload.single("ProfilePhoto"), UserProfile_Controller);
route.get("GetUserProfile", requiredLogin, Get_UserProfile_Controller)
route.put("UpdateUserProfile", requiredLogin, upload.single("ProfilePhoto"), Update_UserProfile_Controller);

module.exports = route;
