// let mysql = require('mysql');
// // let db = require('../configs/db');
// let pool = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'course'
// });
//
// module.exports = {
//     connPool (sql, val, cb) {
//         pool.getConnection((err, conn) => {
//             console.log('----------')
//             console.log(pool)
//             console.log(err)
//             console.log(conn)
//             console.log('----------')
//             let q = conn.query(sql, val, (err, rows) => {
//
//                 if (err) {
//                     console.log(err);
//                 }
//
//                 // console.log(a);
//
//                 cb(err, rows);
//
//                 conn.release();
//             });
//         });
//     },
//
//     // json格式
//     writeJson(res, code = 200, msg = 'ok', data = null) {
//         let obj = {code, msg, data};
//
//         if (!data) {
//             delete obj.data;
//         }
//
//         res.send(obj);
//     },
// };


var mysql = require('mysql');
var db = require('../configs/db');

module.exports = {
    getList(){
        var connection = mysql.createConnection(db);

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
            return result;
        });

        connection.end();
    }
}