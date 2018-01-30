const operation = require('../operation');

/**
 * 修改某个用户的数据
 * @param {*} openid 用户id
 * @param {*} callback 回调函数
 */
module.exports = function(openid, data, callback) {
    operation.update('user', data, {id: openid}, callback);
}