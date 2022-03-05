"use strict";

const fs = require("fs").promises;
const { rejects } = require("assert");
const { resolve } = require("path");
const db = require("../config/db");
class UserStorage{
 
    static #getuserInfo(data, id){        
        const users = JSON.parse(data);
        console.log(id);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx];                
            return newUser;
        },{});
        return  userInfo;
    }

    static #getUsers(data, isAll, fields){   
        const users = JSON.parse(data);  
        if(isAll) return users;   

        const newUsers = fields.reduce((newUsers,field)=> {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});     
        return newUsers;
    }
    //static getUsers(isAll,...fields)  {  
        // return fs.readFile("./src/database/users.json")
        // .then((data)=>{
        //     return this.#getUsers(data, isAll,fields);
        // })
        // .catch(console.error);
    //}

    static getUserinfo(id){
        return new Promise((resolve, reject)=>{
            // db 접근해서 정보 가져오기
            db.query("SELECT * FROM users WHERE id = ?",[id],(err,data)=>{
                console.log(data[0]);
                if(err) reject(`${err}`);
                resolve(data[0]);
            });
        });
        
        // return fs.readFile("./src/database/users.json")
        // .then((data)=>{
        //     return this.#getuserInfo(data, id);
        // })
        // .catch(console.error);
    }

    static async save(userInfo){
        return new Promise((resolve, reject)=>{
            // db 접근해서 정보 가져오기
            const query = "INSERT INTO users(id,name,psword) values(?,?,?)";
            db.query(query,[userInfo.id,userInfo.name,userInfo.pw],(err,data)=>{
                console.log(data[0]);
                if(err) reject(`${err}`);
                resolve({success:true});
            });
        });
        // const users = await this.getUsers(true);

        // if(users.id.includes(userInfo.id)){
        //     throw "아이디 중복";
        // }
        //     users.id.push(userInfo.id);
        //     users.pw.push(userInfo.pw);
        //     users.name.push(userInfo.name);
        
        // fs.writeFile("./src/database/users.json",JSON.stringify(users));
        return {success:true};
    }
}

module.exports = UserStorage;