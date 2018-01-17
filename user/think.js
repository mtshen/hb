const appid = 'wx231338562e57658d';
const secret = 'bcd4eebc1212c65eb604bc0fcc2f32f9';
Think.answer({
    url: '/getuser_openid',
    callback: (loginCode, {response}) => {
        console.log(`[${typeof loginCode}]:`, loginCode);
        console.log(typeof Think.tool.request);
        Think.tool.request({
            url: '/sns/jscode2session',
            host: 'https://api.weixin.qq.com',
            data: {
                appid, secret,
                grant_type: 'authorization_code',
                js_code: loginCode.code
            },
            method: 'get',
            headers: {  
                'content-type': 'application/json'  
            }, 
            callback: function(data) {
                console.log('https://api.weixin.qq.com', data);
                response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
                response.end(JSON.stringify(data.data));
            }
        });
        
        return Think.END;
    }
});


