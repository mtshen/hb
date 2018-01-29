// 创建订单及订单状态变更
const operation = require('./noload_public/operation');
const getOperationId = require('./noload_public/getoperationid');

Think.answer({
    url: '/createPaperOrder',
    callback: (json, {response}) => {
        let {moneyTotal, openid, paperId, data} = json;

        // 请求新的数据ID
        operation.length('bargain', 'id', (error, dataList) => {
            // 错误处理
            if (error) {
                return errorHandle(error, response);
            }

            console.log('dataList>', typeof dataList[0], dataList[0]);
            // getOperationId();

            // 返回数据
            response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
            response.end();
        });

        return Think.END;
    }
});

function errorHandle(error, response) {
    console.log('[ERROR: /createPaperOrder]', error.message);
    response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
    response.end(JSON.stringify({error: true, message: error.message}));
    return false;
}
