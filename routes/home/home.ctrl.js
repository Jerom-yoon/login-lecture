"use strict";

const User = require("../../src/model/User");
const UserStorage = require("../../src/model/UserStorage");
const logger = require("../../src/config/logger");


// controller

const output = {
    home :  (req, res)=>{
        logger.info(`GET / 200 "홈화면 이동"`);
        res.render("home/index");
    },
    login : (req, res)=>{
        logger.info(`GET /login 200 "login화면 이동"`);
        res.render("home/login");
    },
    register : (req, res)=>{
        logger.info(`GET /register 200 "register화면 이동"`);
        res.render("home/register");
    },
    uploadfile : (req, res)=>{
        logger.info(`GET /register 200 "uploadfile화면 이동"`);
        res.render("home/uploadfile");
    },
};


const process = {
    login : async (req, res)=>{
        const user = new User(req.body);
        const response = await user.login();
        
        const url = {
            method:"POST",
            path:"/login",
            status:response.err ? 400:200,
        };
        log(response, url);
        
        return res.status(url.status).json(response);
    },
    register : async (req, res)=>{

        const user = new User(req.body);
        const response =  await  user.register();
        const url = {
            method:"POST",
            path:"/register",
            status:response.err ? 400:201,
        };
        log(response, url);
        
        return res.status(url.status).json(response);
    },
    uploadfile : async (req, res)=>{

        try{
            var files = req.files;
            console.log(req);
            console.dir('#==== 업로드된 첫번째 파일 정보 ====#');
            console.dir(req.files[0]);
            console.dir('#=====#');
            
            // 현재의 파일 정보를 저장할 변수 선언
            var originalname = '',
                filename = '',
                mimetype= '',
                size = 0;
            
                if(Array.isArray(files)){
                    console.log("배열에 들어있는 파일의 갯수 : %d",files.length);
                    for(var index = 0; index < files.length; index++){
                        originalname = files[index].originalname;
                        filename = files[index].filename;
                        mimetype = files[index].mimetype;
                        size = files[index].size;
                    }
                }else{
                    // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
                    console.log('파일 갯수 : 1');
                    
                    originalname = files[index].originalname;
                    filename = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
                    
                }
            console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
            
            //클라이언트에 응답 전송
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h3>파일 업로드 성공</h3>');
            res.write('<hr/>');
            res.write('<p>원본 파일 이름 : ' + originalname + '-> 저장 파일명 ' + filename + '</p>');
            res.write('<p>MIME TYPE : ' + mimetype + '</p>');
            res.write('<p>파일 크기 : ' + size + '</p>');
            res.end();
            
        }
        catch(err){
            console.dir(err.stack);
        }
    }
};

module.exports = {
    output,
    process,
};

const log = (response, url)=>{
    if(response.err){
        logger.error(
            `${url.method} /${url.path} ${url.status} "Response:"${response.success},${response.err}"`);
        }
    else{
        logger.info(
            `${url.method} /${url.path} ${url.status} "Response:"${response.success},${response.msg || ""}"`);
        }    
}