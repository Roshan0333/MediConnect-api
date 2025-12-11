const express = require("express");

const route = express.Router();

route.get("/pincode", async (req, res) => {
    try {
        const { pin } = req.query;

        const response = await fetch(`http://www.postalpincode.in/api/pincode/${pin}`);
        const data = await response.json();

        if(!data){
            return res.status(404).json({status:404, msg: "Please Enter Correc ZipCode"})
        }

        return res.status(200).json({status: 200, data:data})
    }
    catch(err){
        return res.status(500).json({status: 500,  error: err.message})
    }
});

module.exports = route
