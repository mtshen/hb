const operation = require('./noload_public/operation');
const errorHandle = require('./noload_public/errorHandle');
const INTERFACE_NAME = '/getuser_data';

/**
 * 查询用户数据
 * 能够查询到用户的基本数据, 
 * 查询的是 user 表, 根据 id 查询
 * 如果没有查询到, 则表示用户是第一次加载, 会自动创建一个用户数据
 */
Think.answer({
    url: INTERFACE_NAME,
    callback: (data, {response}) => {
        // 获取前台数据
        const {openid} = data;

        // 预设用户信息
        let SQL_DATA = {
            id: openid,
            balance: 0,
            send: 0,
            receive: 0,
            data: ''
        };

        // 查询user
        operation.query('user', {id: openid}, (error, dataList) => {
            // 处理错误
            if (error) {
                return errorHandle(error, response, INTERFACE_NAME);
            }

            // 如果用户存在, 则直接返回用户数据
            if (dataList.length) {
                SQL_DATA = dataList[0];
            } else {
                // 如果用户不存在则创建一个新的用户数据
                operation.add('user', SQL_DATA, (error) => {
                    if (error) {
                        return errorHandle(error, response, INTERFACE_NAME);
                    }
                });
            }

            // 返回数据
            response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
            response.end(JSON.stringify(SQL_DATA));
        });
    
        return Think.END;
    }
});
