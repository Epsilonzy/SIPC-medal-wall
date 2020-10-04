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
    phoneNum: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    }
});

//新闻页面的表
const medals = mongoose.Schema({
    medalsId: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    content: Array,
    pubDate: String,
    type: String,
    imgUrl: String,
    tag: Array,
    puber: String
})

module.exports = {
    Users: mongoose.model('users', users),
    Medals: mongoose.model('medals', medals)
}