const mongoose = require('mongoose');
const config = require('./info.json');

mongoose.connect(`${config.mongoDBUrl}/${config.dataBase}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(res => {
    console.log('数据库连接成功');
}).catch(err => {
    console.log('数据库连接失败');
})

//// "mongoDBUrl": "mongodb://localhost:27017",

//用户个人信息的表
const users = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    gender: String,
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 100
    },
    getMedals: Array, //存放已获得勋章的ID
    getMedalsNew: Array,
    isStd: {
        type: Number,
        default: 1
    } //存放新获得勋章的ID
});

//新闻页面的表
const medals = mongoose.Schema({
    medalId: {
        type: String,
        required: true,
    },
    medalName: String,
    content: String, //勋章详情
    imgUrl: String, //勋章url
    weight: Number //排名权值
});

const admin = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = {
    Users: mongoose.model('users', users),
    Medals: mongoose.model('medals', medals),
    Admin: mongoose.model('admin', admin)
}