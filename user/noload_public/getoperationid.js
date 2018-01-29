const BASE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

function parse(num, baseList = []) {
    const end = BASE[num % 36];
    const digit = Number.parseInt(num / 36, 10);
    
    // 如果值 >= 36, 则获取下一位的值
    if (digit) {
        baseList.unshift(end);
        parse(digit, baseList);
    } else {
        baseList.unshift(end);
    }

    return baseList;
}


function getid(num = 0, length = 10) {
    let ids = parse(num);
    for (let i = length - ids.length; i > 0; i--) {
        ids.unshift(BASE[0]);
    }
    return ids.join('');
}

module.exports = getid;