const request = require('request');
const conf = require('./utils/option.json');
const {appid, secret} = conf;
console.log('llllllllllllllllllllllllll');
/**
 * 获取用户的openid
 */
Think.answer({
    url: '/getuser_openid',
    callback: (loginCode, {response}) => {
        console.log('llllllllllllllllllllllllll');
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${loginCode.code}`;

        request.get({url}, function(error, res, body) {
            const openid = JSON.parse(body).openid;
            response.writeHead(200, {"Content-Type": 'application/json; charset=utf-8'});
            response.end(JSON.stringify({openid}));
        });
        
        return Think.END;
    }
});


