let express = require('express');
let subjectRouter = express.Router();
var mysql = require('mysql');
var db = require('../configs/db');
let func = require('../sql/func');
let goods = require('../controls/goods');
let api = require('../api');



// 科目
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