/*
    能够将一个 10进制的数值 转换成一个 36进制数值并返回
*/
const BASE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

// 10进制递归转换
function parse(num, baseList = []) {
    const end = BASE[num % 36];
    const digit = Number.parseInt(num / 36, 10);
    
    // 如果值 >= 36, 则获取下一位的值
    baseList.unshift(end);
    digit && parse(digit, baseList);
    
    return baseList;
}

/**
 * 将获得一个长度为 length 的 36进制的 id
 * @param {*} num  转换的数值
 * @param {*} length  长度
 */
module.exports = function(num = 0, length = 10) {
    let ids = parse(num);
    for (let i = length - ids.length; i > 0; i--) {
        ids.unshift(BASE[0]);
    }
    return ids.join('');
};