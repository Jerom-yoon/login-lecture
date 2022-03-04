"use strict";

const id = document.querySelector("#id"),
    uname = document.querySelector("#name"),
    pw = document.querySelector("#pw"),
    pwconf = document.querySelector("#pwconf"),
    registerBtn = document.querySelector("#btn");

console.log("register hello");

registerBtn.addEventListener("click",register);

function register(){
    if(!id.value)    return alert("아이디를 입력하세요.");
    if(pw!= pwconf)    return alert("비번이 다릅니다.");
    const req = {
        id: id.value,
        pw:pw.value,
        name: uname.value,
    };
    fetch("/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href = "/login";
        }
        else{
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error("register error"));
    });
}