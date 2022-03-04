"use strict";

const User = require("../../src/model/User");
const UserStorage = require("../../src/model/UserStorage");
// controller

const output = {
    home :  (req, res)=>{
        res.render("home/index");
    },
    login : (req, res)=>{
        res.render("home/login");
    },
    register : (req, res)=>{
        res.render("home/register");
    },
};


const process = {
    login : async (req, res)=>{
        const user = new User(req.body);
        const response = await user.login();
        //console.log(response);
        return res.json(response);
    },
    register : async (req, res)=>{

        const user = new User(req.body);
        const response =  await  user.register();
        //console.log(response);
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};