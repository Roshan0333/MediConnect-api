const express = require("express");

const bcrypt = require("bcrypt");

let saltRounds = 15;

async function passwordEncrypt(plainPassword){
    return await bcrypt.hash(plainPassword, saltRounds,);
}

async function passwordDecrypt(plainPassword,hash){
    return await bcrypt.compare(plainPassword, hash);
}


module.exports= {passwordEncrypt, passwordDecrypt};