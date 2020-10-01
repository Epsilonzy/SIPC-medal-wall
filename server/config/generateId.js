const md5 = require('md5');

function getUTF8Bytes(str) {
    var bytes = [];
    var len = str.length;
    for (var i = 0; i < len; ++i) {
        var code = str.charCodeAt(i);
        if (code >= 0x10000 && code <= 0x10ffff) {
            bytes.push((code >> 18) | 0xf0); // 第一个字节
            bytes.push(((code >> 12) & 0x3f) | 0x80);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x800 && code <= 0xffff) {
            bytes.push((code >> 12) | 0xe0);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x80 && code <= 0x7ff) {
            bytes.push((code >> 6) | 0xc0);
            bytes.push((code & 0x3f) | 0x80);
        } else {
            bytes.push(code)
        }
    }
    return bytes;
}

function hexString(bytes) {
    var arr = bytes.map(function(code) {
        return (code).toString(16).toUpperCase();
    });
    return arr.join(' ');
}

function utf8(str) {
    return hexString(getUTF8Bytes(str));
}

function generateUser(name) {
    let time = new Date().getTime();
    let timeString = time.toString();
    let timeArr = timeString.split('');
    let firstNum = name.length;
    let secondNum = 0;
    let secondSum = getUTF8Bytes(name);
    getUTF8Bytes(name).forEach(item => {
        secondNum += Number.parseInt(item % 10);
    })
    secondNum = secondNum % secondSum.length;
    timeArr.splice(0, 6, firstNum, secondNum);
    return timeArr.join('');
}

function generateVideo(videoName, secreteKey) {
    let str = videoName + secreteKey;
    str = md5(str);
    let time = new Date().getTime();
    time = time.toString();
    time = time.split('');
    time = time.splice(8, 13);
    time = time.join('');
    return `LV${time}${str.slice(0,6)}`;
}
module.exports = {
    generateUserId: generateUser,
    getUtf8: utf8,
    getUTF8Bytes: getUTF8Bytes,
    generateVideoId: generateVideo
}