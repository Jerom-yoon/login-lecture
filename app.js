
//express 로 서버 라우팅
const express = require("express");
const app= express();
const home = require("./routes/home"); // routing
const PORT = 3000;
// app setting
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home);  // 미들웨어 등록

module.exports = app;



// express 사용하지 않고 http 로 서버구성
// const http = require("http");
// const app = http.createServer((req,res)=>{
//     console.log(req.url);
//     res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
//     if(req.url === "/"){
//         res.end("here is root");
//     }else if(req.url ==="/login"){
//         res.end("here is login 로그인");
//     }

// }
// );

// app.listen(3001, ()=>{
//     console.log("Http server")
// })
