// 操作sql测试
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shen1234QWER',
    database: 'paper'
});

connection.connect();

const addSql = 'INSERT INTO user(id,balance,send,receive,data) VALUES(?,?,?,?,?)';
const addSqlParams = ['asdljfsuaodaiwnf', '100.00', '100.00', '100.00', ''];
//增
connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }
    console('成功 =>', result);
});

connection.end();