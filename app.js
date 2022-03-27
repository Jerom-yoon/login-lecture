
//express 로 서버 라우팅
const bodyParser = require("body-parser");
const express = require("express");
var morgan = require('morgan')
const dotenv=require("dotenv");
var expressSession = require('express-session');
var multer = require('multer');
var fs = require('fs');

dotenv.config();
const home = require("./routes/home"); // routing
const accessLogStream = require("./src/config/log");
const logger = require("./src/config/logger");
const Scheduler = require('./src/config/node-schedule');
const app= express();
// app setting
app.set("views", "./views");
app.set("view engine", "ejs");
logger.error("hello everyone");

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('common',{stream:logger.stream}));
app.use(morgan('dev'));

const myschedule = new Scheduler.Scheduler(7,21,47);

fff = ()=>{
    console.log('Today is recognized by Rebecca Black!');
}
myschedule.set(fff);

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
