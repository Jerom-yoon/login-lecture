"use strict";

class UserStorage{
    
    static #users = {
        id:["woorimIT", "나개발", "김팀장"],
        pw:["1234","1234","1234"],
        name:["1","2","3"],
    };

    static getUsers(...fields)  {  
        const users = this.#users;
        const newUsers = fields.reduce((newUsers,field)=> {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        },{});     
        return newUsers;
    }

    static getUserinfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx];
            
            return newUser;
        },{});
        return  userInfo;
    }

    static save(userInfo){
        const users = this.#users;
        users.id.push(userInfo.id);
        users.pw.push(userInfo.pw);
        users.name.push(userInfo.name);
        console.log(users);
    }
}

module.exports = UserStorage;