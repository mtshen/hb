const operation = require('../utils/mysql/operation');

/**
 * 查询用户数据
 * 先查询用户数据, 如果用户没有该数据则新增一个空数据, 并返回
 */
Think.answer({
    url: '/getuser_data',
    callback: (data, {response}) => {
        const openid = data.openid;
        console.log('1111');

        // 测试数据
        operation.query('user', {id: openid}, (error, dataList) => {
            if (error) {
                return errorHandle(error, response);
            }

            const SQLDATA = {id: openid, balance: 0, send: 0, receive: 0, data: ''};
            if (dataList.length) {
                console.log(JSON.stringify(dataList[0]));
                response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
                response.end(JSON.stringify(dataList[0]));
            } else {
                operation.add('user', SQLDATA, (error) => {
                    if (error) {
                        return errorHandle(error, response);
                    }
                    response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
                    response.end(JSON.stringify(SQLDATA));
                });
            }
        });
    
        return Think.END;
    }
});

function errorHandle(error, response) {
    console.log('[ERROR: /getuser_data]', error.message);
    response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
    response.end(JSON.stringify({error: true, message: error.message}));
    return false;
}
