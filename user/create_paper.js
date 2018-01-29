// 创建订单及订单状态变更
const operation = require('./noload_public/operation');

Think.answer({
    url: '/create_order',
    callback: (data, {response}) => {
        // let {money, }
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
