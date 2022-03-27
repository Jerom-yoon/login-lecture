const fs = require("fs");
const appRoot = require("app-root-path");
const internal = require("stream");


var accessLogStream = fs.createWriteStream(
    
    `${appRoot}/log/access.log`, { flags: 'a' })


module.exports = accessLogStream;