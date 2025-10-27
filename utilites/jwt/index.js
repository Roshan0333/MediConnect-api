const jwt = require("jsonwebtoken");
require('dotenv').config();

let jwt_Secert_Key = process.env.jwt_Secert_Key;

let jwtToken_Create = (user) => {
    const accessToken =  jwt.sign({user}, jwt_Secert_Key, { expiresIn: "24h" });
    const refreshToken = jwt.sign({user}, jwt_Secert_Key,{expiresIn: "30d"});

    return {accessToken, refreshToken};
}

module.exports = jwtToken_Create