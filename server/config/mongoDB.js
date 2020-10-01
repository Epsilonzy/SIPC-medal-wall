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
    userId: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarImg: {
        type: String,
        default: 'static/image/default-avatar.jpg',
        set(url) {
            if (url.search("static/") == -1) {
                return `static/image/${url}`;
            } else {
                return 'static/image/default-avatar.jpg';
            }
        }
    },
    gender: String,
    name: String,
    age: {
        type: Number,
        min: 0,
        max: 150
    }
});

//新闻页面的表
const news = mongoose.Schema({
    newsId: {
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
    News: mongoose.model('news', news)
}