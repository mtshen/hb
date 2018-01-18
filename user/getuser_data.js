Think.answer({
    url: '/getuser_data',
    callback: (data, {response}) => {
        const openid = data.openid;
        // 测试数据
        const SQLDATA = {id: openid, balance: 1, send: 0, receive: 1, data: ''};
        response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
        response.end(JSON.stringify(SQLDATA));        
        return Think.END;
    }
});


