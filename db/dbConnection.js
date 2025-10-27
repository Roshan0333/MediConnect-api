const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/MediConnect"

let dbConnection = async () => {
    try{
       await  mongoose.connect(url);
       console.log("DataBase Connected Successfully");
    }
    catch(err){
        console.log(`${err}`);
    }
}

module.exports = dbConnection;