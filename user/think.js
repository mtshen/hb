const request = require('request');
const appid = 'wx231338562e57658d';
const secret = 'bcd4eebc1212c65eb604bc0fcc2f32f9';
Think.answer({
    url: '/getuser_openid',
    callback: (loginCode, {response}) => {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${loginCode.code}`;

        request.get({url}, function(error, res, body) {
            const openid = JSON.parse(body).openid;
            response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
            response.end(JSON.stringify({openid}));
        });
        
        return Think.END;
    }
});


