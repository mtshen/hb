// 创建订单及订单状态变更
const operation = require('./noload_public/operation');

/**
 * 这里使用伪连接的方式传输数据
 */
Think.answer({
    url: '/data/image/order.jpg',
    callback: (data, {response}) => {
        
        // 测试连接
        response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
        response.end(JSON.stringify({ok: true}));
        return Think.END;
    }
});

function errorHandle(error, response) {
    console.log('[ERROR: /getuser_data]', error.message);
    response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
    response.end(JSON.stringify({error: true, message: error.message}));
    return false;
}
