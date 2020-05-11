const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const schedule = require("node-schedule");
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = ''
const secretAccessKey = ''

/* GET users listing. */

// var rule = new schedule.RecurrenceRule();
//
// var times = [1,6,11,16,21,26,31,36,41,46,51,56];
// rule.second = times;
//
// schedule.scheduleJob(rule, function(){
//
//     console.log("执行任务");
//
// });

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

            //初始化sms_client
        let smsClient = new SMSClient({accessKeyId, secretAccessKey})
            //发送短信
        smsClient.sendSMS({
            PhoneNumbers: '13372416792',
            SignName: '小曹课程管家',
            TemplateCode: 'SMS_123669090',
            TemplateParam: '{"weekday":"星期一","course":"大学语文"}'
        }).then(function (res) {
            let {Code}=res
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
            }
        }, function (err) {
            console.log(err)
        })
    }
};

router.get('/', function(req, res, next) {
    sendUtil.sendMessage();
    res.send('respond with a resource');
});


module.exports = router;
