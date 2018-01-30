const operation = require('../operation');

/**
 * 查询某个用户的数据
 * @param {*} openid 用户id
 * @param {*} callback 回调函数
 */
module.exports = function(openid, callback) {
    operation.query('user', {id: openid}, callback);
}