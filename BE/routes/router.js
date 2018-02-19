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
        // if(weekday === 0){
        //     // 如果能被7 整除 ，则是星期一
        //     weekday = 1
        // }

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
        var sql = "select c.*,s.* from course c,subject s where s.id = c.subject_id and c.weekday = "+weekday+" and c.is_single in (0,"+isSingleWeek+") and c.semester = "+semester+"";
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
            for(let i = 0;i<result.length;i++){
                console.log(result[i])
                //let courseContent = `${result[i].name},在${result[i].classroom},${util.formatDate(Number(result[i].start_time))}~${util.formatDate(Number(result[i].start_time))}.`;
                //resultContent += courseContent;
            }
            console.log(resultContent)

            console.log(result[0].name);
            console.log(result[0].weekday);
            console.log(result[0].classroom);
            console.log(result[0].start_time);
            console.log(result[0].end_time);
            let weekday = result[0].weekday;
            switch (weekday){
                case 1:
                    weekday = '一';
                    break;
                case 2:
                    weekday = '二';
                    break;
                case 3:
                    weekday = '三';
                    break;
                case 4:
                    weekday = '四';
                    break;
                case 5:
                    weekday = '五';
                    break;
                case 6:
                    weekday = '六';
                    break;
                case 7:
                    weekday = '天';
                    break;

            }
            let startTime = util.formatDate(result[0].start_time);
            let endTime = util.formatDate(result[0].end_time);
            console.log('------------------------------------------------------------\n\n');
            returnResult = result;
            // result.json({code: 200, message: 'ok', course:returnResult})
            //初始化sms_client
            let smsClient = new SMSClient({accessKeyId, secretAccessKey})
            //发送短信
            smsClient.sendSMS({
                PhoneNumbers: '18868412098',
                SignName: '小曹课程管家',
                TemplateCode: 'SMS_123669090',
                // TemplateCode: 'SMS_125118316',    新的
                // TemplateParam: '{"weekday":"星期'+weekday+'","course":"'+resultContent+'"}'
                // TemplateParam: '{"weekday":"星期'+weekday+'","course1":"大学语文","classroom1":"K2-201","startTime1":"10:00","endTime1":"12:00",}'
                TemplateParam: '{"weekday":"星期'+weekday+'","course":"大学语文，K2-201"}'
            }).then(function (res) {
                let {Code}=res;
                if (Code === 'OK') {
                    //处理返回参数
                    console.log(res)
                }
            }, function (err) {
                console.log(err)
            })
        });

        connection.end();


    }
};

var rule = new schedule.RecurrenceRule();

var time = [7,12,17];
rule.hour = time;

schedule.scheduleJob(rule, function(){

    console.log("执行任务");
    sendUtil.sendMessage()

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

    var connection = mysql.createConnection(db);
    var returnResult;
    connection.connect();

    var  sql = 'INSERT INTO subject(name) VALUES(?)';
    var  getSql = "SELECT `id` FROM `subject` WHERE `name` = ?";

    var addSubjectName = [subject];

    connection.query(getSql,addSubjectName,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
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

            connection.end();
            return;
        }else{
            // 查到结果，重复
            res.json({code: 200, message: '重复'})
        }
    });

    connection.end();

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