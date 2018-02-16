let express = require('express');
let subjectRouter = express.Router();
var mysql = require('mysql');
var db = require('../configs/db');
let func = require('../sql/func');
let goods = require('../controls/goods');
let api = require('../api');



// goods
subjectRouter.get(subjectList, function (req, res,next) {
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
subjectRouter.post(api.subjectAdd, goods.addOne);
subjectRouter.post(api.subjectDelete, goods.deleteOne);


module.exports = subjectRouter;