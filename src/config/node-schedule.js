"use strict";

const schedule = require('node-schedule');

class Scheduler{
    constructor(date,hour,minute){
        this.date = date;
        this.hour = hour;
        this.minute = minute;
    }
    set( fun) {
        const rule = new schedule.RecurrenceRule();
        rule.date = this.date;
        rule.hour = this.hour;
        rule.minute = this.minute;

        const job = schedule.scheduleJob(rule, fun);
    }
    cancel(){
        if(schedulelist != null){
            schedulelist.cancel();
        }
    }
  
}

const sch = new Scheduler(20,7,3);
module.exports = {Scheduler};