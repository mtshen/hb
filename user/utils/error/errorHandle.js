/**
 * sql操作错误的统一处理函数
 * @param {*} error     错误对象 
 * @param {*} response  response对象
 * @param {*} interfaceName  接口名称
 */
module.exports = function (error, response, interfaceName) {
    console.log(`[ERROR: ${interfaceName}]`, error.message);
    response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
    response.end(JSON.stringify({error: true, message: error.message}));
    return false;
}