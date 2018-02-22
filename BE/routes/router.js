let express = require('express');
let subjectRouter = express.Router();
var mysql = require('mysql');
var db = require('../configs/db');
let func = require('../sql/func');
let goods = require('../controls/goods');
let api = require('../api');
var util = require('../util/util')

const request = require('request');
const nodemailer = require('nodemailer');
const schedule = require("node-schedule");
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAI7G7rmVPofV8M'
const secretAccessKey = 'k0H6cQeCm7hkG61uwvnqsqQI8bVowb';
const twoClassKey = 'SMS_125023595';
const oneClassKey = 'SMS_125028639';
const noClassKey = 'SMS_125028637';


// 发送邮件和短信 api

/* GET users listing. */



var data = '';
const url = ' http://api.yytianqi.com/forecast7d?city=CH281701&key=1r3fajefo4csg9tm';
var sendUtil = {
    sendMail:()=>{
        request(url, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            data = JSON.parse(body);
            let transporter = nodemailer.createTransport({
                host: "smtp.163.com",//主机，你设置pop3/smtp的时候，网易提供
                port: 465,
                secure: true,
                auth: {
                    user: '18868412098@163.com',//你自己的邮箱，博主的是网易邮箱
                    pass: '925314084.'//邮箱的密码
                }
            });
            let mailOptions = {
                from: 'YuutA <18868412098@163.com>',
                to: '925314084@qq.com',//要发送的邮箱地址
                subject: '今天天气',
                text: '城市 :' + data.data.cityName + '时间：' + data.data.sj,
                html: '<b>白天天气情况：' + data.data.list[0].tq1 + '</b><br/><b>夜间天气:' + data.data.list[0].tq2 + '</b><br/>白天温度' + data.data.list[0].qw1 + '度<br/>夜间温度' + data.data.list[0].qw2
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                console.log('Message %s sent %s', info.messageId, info.response);
            });
        });
    },
    sendMessageAPI:(TemplateCode,timeRange,weekday,resultArr)=>{
        let smsClient = new SMSClient({accessKeyId, secretAccessKey});
        let TemplateParam;
        if(TemplateCode === 'SMS_125118443'){
            // 一节课
            console.log('一节课')
            TemplateParam = '{"timeRange":"'+timeRange+'","weekday":"星期'+weekday+'","name1":"'+resultArr[0].name+'","address1":"'+resultArr[0].classroom+'","time1":"'+resultArr[0].start_time+" ~ "+''+resultArr[0].end_time+'"}';
            console.log(TemplateParam)
        }else if(TemplateCode === 'SMS_125023619'){
            // 两节课
            console.log('两节课')
            TemplateParam = '{"timeRange":"'+timeRange+'","weekday":"星期'+weekday+'","name1":"'+resultArr[0].name+'","address1":"'+resultArr[0].classroom+'","time1":"'+resultArr[0].start_time+" ~ "+''+resultArr[0].end_time+'","name2":"'+resultArr[1].name+'","address2":"'+resultArr[1].classroom+'","time2":"'+resultArr[1].start_time+" ~ "+''+resultArr[1].end_time+'"}';
        }else if(TemplateCode === 'SMS_125118464'){
            // 没课
            console.log('没课')
            TemplateParam = '{"timeRange":"'+timeRange+'","weekday":"星期'+weekday+'"}';
        }
        smsClient.sendSMS({
            PhoneNumbers: '18868412098',
            SignName: '小曹课程管家',
            TemplateCode: TemplateCode,
            TemplateParam: TemplateParam
        }).then(function (res) {
            let {Code}=res;
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
            }
        }, function (err) {
            console.log(err)
        })
    },
    sendMessage:()=>{

        // 单双周
        let today = new Date('2018/03/06');
        let isSingleWeek = Math.floor((Number(today) - Number(new Date('2018/03/05')))/(1000*60*60*24)/7);
        if(isSingleWeek%2){
            // 双周
            isSingleWeek = 2;
        }else{

            // 单周
            isSingleWeek = 1;
        }

        // 周几
        let weekday = (Number(today) - Number(new Date('2018/03/05')))/(1000*60*60*24)%7;
        weekday++;

        // 学期
        var date = new Date();
        const begin2017second = new Date('2018/03/03');
        const end2017second = new Date('2018/07/10');
        const begin2018first = new Date('2018/09/15');
        const end2018first = new Date('2018/01/13');
        const begin2018second = new Date('2019/03/03');
        const end2018second = new Date('2019/07/10');
        var semester;

        if(begin2017second < date <end2017second){
            semester = '201702'
        }else if(begin2018first < date < end2018first){
            semester = '201801'
        }else if(begin2018second < date <end2018second){
            semester = '201802'
        }
        // console.log(isSingleWeek)
        // console.log(weekday)
        // console.log(semester)

        var timeRangeHour = new Date().getHours();
        var timeRange = '';
        var sql = '';
        if(timeRangeHour === 7){
            // 早上7点发送的短信
            console.log(timeRangeHour)
            timeRange = '早上';
            sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+" and c.start_time < '11:01'";
        }else if(timeRangeHour === 12){
            // 中午12点发送的短信
            timeRange = '中午';
            sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+" and '11:35' < c.start_time and c.start_time < '13:31'";
        }else if(timeRangeHour === 20){
            // 下午5点发送的短信
            timeRange = '下午';
            sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+" and c.start_time > '17:59'";
        }else {
            timeRange = '';
            // sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+"";
            sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+"";

        }

        // var sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+" and c.start_time < 10:00";
        console.log(sql)
        var connection = mysql.createConnection(db);
        var returnResult;
        connection.connect();
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }

            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            var resultContent = '';
            if(result.length>0){
                // 有数据

                // 周几
                let weekday = result[0].weekday;
                weekday = util.switchWeekDay(weekday);

                if(result.length === 2){
                    // 两节课
                    sendUtil.sendMessageAPI('SMS_125023619',timeRange,weekday,result)
                }else{
                    // 一节课
                    sendUtil.sendMessageAPI('SMS_125118443',timeRange,weekday,result)
                }
                // for(let i = 0;i<result.length;i++){
                //     console.log(result[i])
                //     //let courseContent = `${result[i].name},在${result[i].classroom},${util.formatDate(Number(result[i].start_time))}~${util.formatDate(Number(result[i].start_time))}.`;
                //     //resultContent += courseContent;
                // }
                // console.log(resultContent)
                //
                // console.log(result);
                // console.log(result[0].name);
                // console.log(result[0].weekday);
                // console.log(result[0].classroom);
                // console.log(result[0].start_time);
                // console.log(result[0].end_time);
                //
                // let startTime =result[0].start_time;
                // let endTime = result[0].end_time;
                // console.log('------------------------------------------------------------\n\n');
                // returnResult = result;
                // // result.json({code: 200, message: 'ok', course:returnResult})

            }else{
                //没数据

                // 获取当前周几
                // let weekday = new Date().getDay();
                weekday = util.switchWeekDay(weekday);
                //发送短信
                sendUtil.sendMessageAPI('SMS_125118464',timeRange,weekday);
                return;
            }

        });

        connection.end();


    }
};

var rule = new schedule.RecurrenceRule();

// var time = [5,15,25,35,45,55];
// rule.minute = time;
var time = [7,12,17];
rule.hour = time;
rule.minute = 0;

schedule.scheduleJob(rule, function(){

    console.log("执行任务");
    // sendUtil.sendMessage()

});
sendUtil.sendMessage()
// 科目

// 获取科目
subjectRouter.get(api.subjectList, function (req, res,next) {
    var connection = mysql.createConnection(db);
    var returnResult;
    connection.connect();

    var  sql = 'SELECT * FROM subject';
//查
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        returnResult = result;
        res.json({code: 200, message: 'ok', subject:returnResult})
    });

    connection.end();

});

subjectRouter.post(api.subjectDetail, function (rqe,res,next) {
    var  getSql = "SELECT `id` FROM `subject` WHERE `name` = ?";
});
// 添加科目
subjectRouter.post(api.subjectAdd, function (req, res,next){
    // 添加 科目
    let subject = req.body.subject;
    let query, arr;
debugger;
    var connection = mysql.createConnection(db);
    var returnResult;
    connection.connect();

    var  sql = 'INSERT INTO subject(name) VALUES(?)';
    var  getSql = "SELECT `id` FROM `subject` WHERE `name` = ?";

    var addSubjectName = [subject];

    connection.query(getSql,addSubjectName,function (err, result) {
        console.log(result)
        if(result.length === 0){
            console.log('没有重复')
            connection.query(sql,addSubjectName,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }

                console.log('--------------------------INSERT----------------------------');
                console.log('INSERT ID:',result);
                console.log('-----------------------------------------------------------------');

                res.json({code: 200, message: 'done', id:result.insertId})
            });

            // connection.end();
            return;
        }else{
            // 查到结果，重复
            console.log('没有重复')
            res.json({code: 200, message: '重复'})
        }
    });

    // connection.end();

});

// 课程
// 添加课程
subjectRouter.post(api.courseAdd,function (req,res,next) {
    // 添加课程
    let subjectID = req.body.subject;
    let semester = req.body.schoolYear;
    let weekday = req.body.weekday;
    let classRoom = req.body.classRoom;
    let isSingleWeek = req.body.isSingleWeek;
    let timeRange = req.body.timeRange;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let query, arr;

    var connection = mysql.createConnection(db);
    var returnResult;
    connection.connect();

    var sql = 'INSERT INTO course(subject_id,semester,weekday,start_time,end_time,classroom,is_single) VALUES(?,?,?,?,?,?,?)';

    var addCourse = [subjectID,semester,weekday,startTime,endTime,classRoom,isSingleWeek];

    connection.query(sql,addCourse,function (err, result) {
        if(err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------');

        res.json({code: 200, message: 'done',result:result.insertId})

    });

    connection.end();
});




module.exports = subjectRouter;