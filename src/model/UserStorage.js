"use strict";

const fs = require("fs").promises;
const db = require("../config/db");
class UserStorage{
 
    static getUserinfo(id){
        return new Promise((resolve, reject)=>{
            // db 접근해서 정보 가져오기
            db.query("SELECT * FROM users WHERE id = ?",[id],(err,data)=>{
                if(err) {
                    //console.log(err.sqlMessage);
                    reject(`${err}`);
                }
                else {
                    console.log(id);
                    resolve(data[0]);
                }
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
            const query = "INSERT INTO users(id,name,pw) values(?,?,?)";
            db.query(query,[userInfo.id,userInfo.name,userInfo.pw],(err)=>{
                
                if(err) {
                    reject(`${err}`);
                }
                else resolve({success:true});
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
}

module.exports = UserStorage;