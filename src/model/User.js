"use strict";
const UserStorage=require("./UserStorage");
const logger = require("../../src/config/logger");
class User{
    constructor(body){
        this.body = body;
    }
    async login(){
        const client = this.body;
        try{
            const user = await UserStorage.getUserinfo(client.id);
            
            if(user.id){
                if(user.id===client.id && user.pw=== client.pw ){
                    logger.info(`${user.id} : ${user.name}`);
                    return {success:true,id:user.id,name:user.name};
                }
                else   return {success:false,msg:"pw incorrect",};
            }
            return {success:false, msg:"id incorrect",};
        }catch(err){
            return {success:false, err};
        }
    
    }

    async register(){
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            return response;
        } catch(err){
            const a = {success : false , err};
            //console.log(typeof a.msg);
            return a;
        }

    }
}

module.exports = User;