"use strict";

const UserStorage = require("../../src/model/UserStorage");
// controller

const output = {
    home :  (req, res)=>{
        res.render("home/index");
    },
    login : (req, res)=>{
        res.render("home/login");
    },
};


const process = {
    login : (req, res)=>{
        const id = req.body.id,
            pw = req.body.pw;
        
        const users = UserStorage.getUsers("id","pw");
        const response = {};
        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.pw[idx] === pw){
                response.success = true;
                return res.json(response);
            }            
        }
        console.log(req.body);
        response.success = false;
        response.msg = "login fail";
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};