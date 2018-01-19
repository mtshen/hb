// 操作sql测试
const mysql = require('mysql');
const option = require('./option.json');

class Mysql {
    constructor(option) {
        super();
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

        for (let tableKey in tableData) {
            tableDataList.push(tableData[tableKey]);
            tableKeyList.push(tableKey);
        }

        this.connection.query(
            `INSERT INTO ${tableName}(${tableKeyList.join()}) VALUES(${tableDataList.join()})`,
            callback
        );
    }

    // mysql 数据删
    remove(tableName, condition, callback = this.invalidCallback) {
        this.connect();
        let conditionText = [];
        for (let key in condition) {
            conditionText.push(`${key}=${condition[key]}`);
        }

        connection.query(`DELETE FROM ${tableName} where ${conditionText.join()}`, callback);
    }

    // mysql 数据改 表名/修改数据/修改条件/回调函数
    update(tableName, tableData = {}, condition = {}, callback = this.invalidCallback) {
        this.connect();
        let tableDataText = [];
        let conditionText = [];
        for (let key in tableData) {
            tableDataText.push(`${key}=${tableData[key]}`);
        }

        for (let key in condition) {
            conditionText.push(`${key}=${condition[key]}`);
        }

        connection.query(`UPDATE ${tableName} SET ${tableDataText.join()} WHERE ${conditionText.join()}`, callback);
    }

    // mysql 数据查
    query(tableName, callback = this.invalidCallback) {
        this.connect();
        this.connection.query(`SELECT * FROM ${tableName}`, callback);
    }

    invalidCallback(error) {
        if (error) {
            console.log('[MYSQL ERROR]', error.message);
        }
    }
}

const sql = new Mysql(option);

module.exports = sql;