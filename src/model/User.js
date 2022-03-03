"use strict";
const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body = body;
    }
    login(){
        const body = this.body;
        const {id,pw} =
        UserStorage.getUserinfo(body.id);
        
        if(id){
            if(id===body.id &&
                pw=== body.pw ){
                    return {success:true};
                }
            else
                return {success:false,
                msg:"pw incorrect",};
        }
        return {success:false,
            msg:"id incorrect",};
    }
}

module.exports = User;