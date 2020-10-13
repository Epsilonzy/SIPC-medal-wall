const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwt = require('jsonwebtoken');
const g = require('../config/generateId');
const time = require('../config/time');
const jwtVerify = require('./module/verify');


/* 
    @route POST /signIn/login
    @aceess 公开的
    @desc 返回token
 */

router.post('/login', async ctx => {
    let phoneNumber = ctx.request.body.phoneNumber;
    //数据库部分
    let sqlRes = await mongoose.Users.findOne({ phoneNumber: phoneNumber });
    if (sqlRes) {
        let token = jwt.sign({ phoneNumber: phoneNumber, iat: time.setOverTime(24) }, config.privateKey);
        ctx.body = {
            status: true,
            token: token,
            content: '登陆成功'
        }
    } else {
        ctx.body = {
            status: false,
            content: '登陆失败,手机号未注册!'
        }
    }
});
router.post('/adminLogin', async ctx => {
    try {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let sqlRes = await mongoose.Admin.findOne({ username: username, password });
        if (sqlRes) {
            let token = jwt.sign({ username: username, iat: time.setOverTime(24) }, config.privateKey);
            ctx.body = {
                status: true,
                token: token,
                content: '登陆成功'
            }
        } else {
            ctx.body = {
                status: false,
                content: '用户名或密码错误'
            }
        }
    } catch (err) {
        ctx.status = 400;
    }
})

/* 
    @route POST /signIn/verify
    @aceess 公开的
    @desc 返回用户token是否合法
 */
router.post('/adminVerify', async ctx => {
    let token = ctx.request.body.token;
    console.log(token);
    ctx.body = await jwtVerify(token, "admin");
})
router.get('/verify', async ctx => {
    let token = ctx.query.token;
    console.log(token);
    ctx.body = await jwtVerify(token);
})

module.exports = router.routes();