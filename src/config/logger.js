const {createLogger, transports, format} = require("winston");
const {combine, timestamp,printf, json, simple, colorize,label} = format;

const printFormat = {
    file : printf(({timestamp, label, level, message})=>{
            return `${timestamp}[${label}]:${level} :${message}`;
        }) ,   
    console: printf(({label, level, message})=>{
        return `[${label}]:${level} :${message}`;
    }), 
};

const printLogFormat = {
    file:combine(
        label({
            label:"백앤드 맛보기",
        }),
        //simple(),
        //colorize(),
        timestamp(
        {
            format:"YYYY-MM-DD hh:mm:dd",
        }),
        json(),
        printFormat.file
    ),
    console: combine(
        colorize(),
        simple(), 
        printFormat.console       
    ),
};
const opts = {
    file : new transports.File({
        filename:"access.log",
        dirname:"./log",
        level:"info",
        format:printLogFormat.file,
    }),
    console: new transports.Console({
        level:"info",
        format:printLogFormat.console,
    }),

};
const logger = createLogger({
    transports:[opts.file],
});

if(process.env.NODE_ENV !== "production")
{
    logger.add(opts.console);
}
module.exports=logger;