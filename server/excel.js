const xlsx = require('node-xlsx');
const mongoose = require('./config/mongoDB.js');
const fs = require('fs');

let obj = xlsx.parse("./stdList.xlsx");

let stdAll = obj[0].data;
stdAll.shift();
let cnt = 0;
let otherData = [{
        name: '牛梓雨',
        phoneNumber: "13920919124",
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    },
    {
        name: '苏栖淼',
        phoneNumber: "18822043307",
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    },
    {
        name: '张钊铭',
        phoneNumber: "18819022293",
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    },
    {
        name: '赵贺',
        phoneNumber: "15030940632",
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    },
    {
        name: '韩宇阳',
        phoneNumber: "15802202580",
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    },
    {
        name: '马晶晶',
        phoneNumber: "18033669850",
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    }
]
stdAll.forEach(item => {
    let name = item[1];
    let phoneNumber = item[5].toString();
    let data = {
        name: name,
        phoneNumber: phoneNumber,
        getMedals: ["#01"],
        getMedalsNew: ['#01']
    }
    new mongoose.Users(data).save(() => {
        cnt++;
        if (cnt == stdAll.length) {
            console.log('学生数据全部导入成功');
        }
    });
});
let index2 = 0;
otherData.forEach(item => {
    new mongoose.Users(item).save(() => {
        index2++;
        if (index2 == otherData.length) {
            console.log('其他数据全部导入成功');
        }
    });
})