// 创建订单及订单状态变更
const operation = require('./utils/operation');
const errorHandle = require('./utils/error/errorHandle');
const INTERFACE_NAME = '/create_order';

Think.answer({
    url: INTERFACE_NAME,
    callback: (data, {response}) => {
        // 测试连接
        response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
        response.end(JSON.stringify({ok: true}));
        return Think.END;
    }
});
