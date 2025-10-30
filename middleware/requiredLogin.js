const express = require("express");
const jwt = require("jsonwebtoken");
const jwtToken_Create = require("../utilites/jwt/index")
require('dotenv').config();

let app = express();

app.use(express.json());


let Cookies = (res,tokenType, token, expiredIn) => {
    res.cookie(tokenType, token, {
        httpOnly:true,
        secure:false,
        sameSite:"Lax",
        maxAge: expiredIn
    })
}

module.exports = (req, res, next) => {
    
    const userAccessToken = req.cookies?.AccessToken;
    const userRefreshToken = req.cookies?.RefreshToken

    if (!userRefreshToken) {
        return res.status(401).json({status: 401, error: "You must be Login", acknownledgement: false });
    }
    else {
        try {
            let jwtTokenVerifer = jwt.verify(userAccessToken, process.env.jwt_Secert_Key);
            req.user = jwtTokenVerifer.user;
            next();

        }
        catch (err) {
            if(err.name === "TokenExpiredError" || err.name === "JsonWebTokenError"){
                try{
                    let jwtTokenVerifer = jwt.verify(userRefreshToken, process.env.jwt_Secert_Key)
                let {accessToken, refreshToken} = jwtToken_Create(jwtTokenVerifer.user);

                Cookies(res, "AccessToken", accessToken, 15 * 60 * 1000);
                Cookies(res,"RefreshToken", refreshToken,30 * 24 * 60 * 60 * 1000)

                req.user = jwtTokenVerifer.user;
                next();
                }
                catch(refreshTokenError){
                    return res.status(403).json({status:403,error:"Refresh token invalid or expired"});
                }
            }
            else{
                return res.status(500).json({ error: err.message });
            }
        }
    }
}