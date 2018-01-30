
// 获取当前时间, 带秒
function getNowDate() {
    const NOW_DATE = new Date;
    // 年 - 月 - 日
    const NOW_YEAR = NOW_DATE.getFullYear();
    const NOW_MONTH = NOW_DATE.getMonth() + 1;
    const NOW_DAY = NOW_DATE.getDate();
    
    // 时 : 分 : 秒
    const NOW_HOURS = NOW_DATE.getHours();
    const NOW_MINUTES = NOW_DATE.getMinutes();
    const NOW_SECONDS = NOW_DATE.getSeconds();

    // date time
    const date = [
        NOW_YEAR, 
        NOW_MONTH < 10 ? `0${NOW_MONTH}` : NOW_MONTH, 
        NOW_DAY < 10 ? `0${NOW_DAY}` : NOW_DAY
    ].join('-');

    const time = [
        NOW_HOURS < 10 ? `0${NOW_HOURS}` : NOW_HOURS, 
        NOW_MINUTES < 10 ? `0${NOW_MINUTES}` : NOW_MINUTES, 
        NOW_SECONDS < 10 ? `0${NOW_SECONDS}` : NOW_SECONDS
    ].join(':');

    return {
        year: NOW_YEAR,
        month: NOW_MONTH,
        day: NOW_DAY,
        hours: NOW_HOURS,
        minutes: NOW_MINUTES,
        seconds: NOW_SECONDS,
        date: date,
        time: time,
        dateTime: `${date} ${time}`
    }
}

module.exports = {getNowDate};