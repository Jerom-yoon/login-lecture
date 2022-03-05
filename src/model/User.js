"use strict";
const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body = body;
    }
    async login(){
        const client = this.body;
        try{
            const {id,pw} = await UserStorage.getUserinfo(client.id);
            
            if(id){
                if(id===client.id &&
                    pw=== client.pw ){
                        return {success:true};
                    }
                else
                    return {success:false,
                    msg:"pw incorrect",};
            }
            return {success:false, msg:"id incorrect",};
        }catch(err){
            return {success:false, msg:err};
        }
    
    }

    async register(){
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            return response;
        } catch(err){
            const a = {success : false , msg:err};
            console.log(typeof a.msg);
            return a;
        }

    }
}

module.exports = User;