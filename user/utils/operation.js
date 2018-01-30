// 操作sql
const mysql = require('mysql');
const option = require('./option.json');

class Mysql {
    constructor(option) {
        this.connection = mysql.createConnection(option);
        this.swit = false; // true：开启, false: 关闭
    }

    // 连接sql
    connect() {
        const { swit } = this;
        if (!swit) {
            this.connection.connect();
            this.swit = true;
        }
    }

    // 结束连接
    end() {
        const { swit } = this;
        if (swit) {
            this.connection.end();
            this.swit = false;
        }
    }

    // mysql 数据增
    add(tableName, tableData, callback = this.invalidCallback) {
        this.connect();
        let tableDataList = [];
        let tableKeyList = [];
        let seat;
        for (let tableKey in tableData) {
            tableDataList.push(tableData[tableKey]);
            tableKeyList.push(tableKey);
        }

        seat = tableDataList.map(() => '?');

        this.connection.query(
            `INSERT INTO ${tableName}(${tableKeyList.join()}) VALUES(${seat.join()})`,
            tableDataList,
            callback
        );
    }

    // mysql 数据删
    remove(tableName, condition, callback = this.invalidCallback) {
        this.connect();
        let conditionText = [];
        let conditionValue = [];
        for (let key in condition) {
            conditionValue.push(condition[key]);
            conditionText.push(`${key}=?`);
        }

        connection.query(
            `DELETE FROM ${tableName} where ${conditionText.join()}`, 
            conditionValue,
            callback
        );
    }

    // mysql 数据改 表名/修改数据/修改条件/回调函数
    update(tableName, tableData = {}, condition = {}, callback = this.invalidCallback) {
        this.connect();
        let tableDataText = [];
        let conditionText = [];
        let keys = [];
        for (let key in tableData) {
            keys.push(tableData[key]);
            tableDataText.push(`${key}=?`);
        }

        for (let key in condition) {
            keys.push(condition[key]);
            conditionText.push(`${key}=?`);
        }

        connection.query(
            `UPDATE ${tableName} SET ${tableDataText.join()} WHERE ${conditionText.join()}`,
            keys,
            callback
        );
    }

    // mysql 数据查
    query(tableName, condition, callback = this.invalidCallback) {
        this.connect();

        let conditionText = [];
        let conditionValue = [];
        for (let key in condition) {
            conditionValue.push(condition[key]);
            conditionText.push(`${key}=?`);
        }

        this.connection.query(
            `SELECT * FROM ${tableName} where ${conditionText.join()}`,
            conditionValue,
            callback
        );
    }
    
    // mysql 查询数据长度
    length(tableName, column = '*', callback = this.invalidCallback) {
        this.connect();
        this.connection.query(`SELECT COUNT(${column}) FROM ${tableName}`, (error, data) => {
            if (error) {
                callback(error);
            } else {
                console.log(data[0][`COUNT(${column})`]);
                callback(void 0, data[0][`COUNT(${column})`]);
            }
        });
    }

    invalidCallback(error) {
        if (error) {
            console.log('[MYSQL ERROR]', error.message);
        }
    }
}

const sql = new Mysql(option);

module.exports = sql;