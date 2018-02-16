let express = require('express');
let subjectRouter = express.Router();
var mysql = require('mysql');
var db = require('../configs/db');
let func = require('../sql/func');
let goods = require('../controls/goods');
let api = require('../api');



// goods
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


subjectRouter.post(api.subjectDetail, goods.fetchById);
// subjectRouter.post(api.subjectAdd, goods.addOne);
subjectRouter.post(api.subjectAdd, function (req, res,next){
    // 添加 科目
    let subject = req.body.subject;
    let query, arr;

    // // 新增
    // query = 'INSERT INTO subject(name) VALUES(?)';
    // arr = [name];


    // func.connPool(query, arr, rows => {
    //     res.send({code: 200, msg: 'done'});
    //
    // });

    var connection = mysql.createConnection(db);
    var returnResult;
    connection.connect();

    var  sql = 'INSERT INTO subject(name) VALUES(?)';
    var addSubjectName = [subject]
//增
    connection.query(sql,addSubjectName,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:',result);
        console.log('-----------------------------------------------------------------\n\n');
        res.json({code: 200, message: 'done', id:result.insertId})
    });

    connection.end();

})


module.exports = subjectRouter;