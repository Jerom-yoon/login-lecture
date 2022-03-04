"use strict";
const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body = body;
    }
    login(){
        const client = this.body;
        const {id,pw} =
        UserStorage.getUserinfo(client.id);
        
        if(id){
            if(id===client.id &&
                pw=== client.pw ){
                    return {success:true};
                }
            else
                return {success:false,
                msg:"pw incorrect",};
        }
        return {success:false,
            msg:"id incorrect",};
    }

    register(){
        const client = this.body;
        UserStorage.save(client);
    }
}

module.exports = User;