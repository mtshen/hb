// 创建订单及订单状态变更
const operation = require('./utils/operation');
const {getNowDate} = require('./utils/getNowDate');
const getOperationId = require('./utils/getoperationid');
const errorHandle = require('./utils/error/errorHandle');
const getUserInfo = require('./utils/userInfo/getUserInfo');
const updateUserInfo = require('./utils/userInfo/updateUserInfo');

const INTERFACE_NAME = '/createPaperOrder';

/**
 * 1. 获取用户可用金额
 * 2. 请求红包id
 * 3. 创建红包订单
 * 4. 扣除用户余额
 * 5. 完成订单创建
 */
Think.answer({
    url: INTERFACE_NAME,
    callback: (json, {response}) => {
        let {moneyTotal, openid, paperId, data} = json;
        // 获取用户信息
        getUserInfo(openid, (error, userData) => {
            // 错误处理
            if (error) {
                console.log('getUserInfo');
                return errorHandle(error, response, INTERFACE_NAME);
            }

            // 获取用户目前可用余额
            const {total} = userData;

            // 请求新的数据ID
            operation.length('bargain', 'id', (error, length) => {
                // 错误处理
                if (error) {
                    return errorHandle(error, response, INTERFACE_NAME);
                }

                // 得到新的id
                const id = getOperationId(length + 1);
                
                // 创建红包信息
                operation.add('bargain', {
                    id: id, 
                    type: paperId, 
                    total: moneyTotal,
                    userid: openid, 
                    balance: moneyTotal,
                    date: getNowDate().dateTime, 
                    data: encodeURIComponent(JSON.stringify(data)), 
                    state: 0
                }, (error) => {
                    // 错误处理
                    if (error) {
                        console.log('add');
                        return errorHandle(error, response, INTERFACE_NAME);
                    }

                    let money = total < moneyTotal ? moneyTotal - total : 0;
                    let surplusMoney = money === moneyTotal ? 0 : total - money;
                    userData.total = surplusMoney;
                    updateUserInfo(openid, userData, function(error) {
                        // 错误处理
                        if (error) {
                            console.log('update');
                            return errorHandle(error, response, INTERFACE_NAME);
                        }

                        // 返回数据
                        response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
                        response.end(JSON.stringify({id: id, money: money}));
                    });
                });
            });
        });


        return Think.END;
    }
});

