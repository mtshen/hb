// 配置文件
let path = require('path');
Think.opt('port', '8637');
Think.opt('path', path.join(Think.DIR, 'www'));
Think.opt('user_path', path.join(Think.DIR, 'user'));
Think.opt('log_path', path.join(Think.DIR, 'log'));
Think.opt('user_exclude', /^utils$/);