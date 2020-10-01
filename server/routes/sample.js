const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwt = require('jsonwebtoken');
const g = require('../config/generateId');
/*
   @route POST /signIn/
   @desc 登陆注册接口
   @access 接口是公开的
 */

// 测试用接口
// router.get('/', async ctx => {
//     let reqData = ctx.query;
//     console.log(reqData);
//     ctx.status = 200;
//     ctx.body = {
//         status: true,
//         content: "user api success"
//     };
// })

/* 
    @route POST /signIn/login
    @aceess 公开的
    @desc 返回token
 */

router.post('/login', async ctx => {
    let reqData = ctx.request.body;
    if (reqData.userId || reqData.phoneNum) {
        let mongoRes = await mongoose.Users.findOne({
            "$or": [
                { userId: reqData.userId },
                { phoneNum: reqData.phoneNum }
            ]
        });
        if (mongoRes && mongoRes.password == reqData.password) {

            //生成token
            let token = jwt.sign({ userId: mongoRes.userId }, config.privateKey);
            ctx.cookies.set(
                'token', token, {
                    path: '/signIn/verify',
                    maxAge: 1000 * 60 * 60 * 2,
                    httpOnly: true,
                    overwrite: true
                }
            )
            ctx.body = {
                status: true,
                content: "登陆成功",
                token: token
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                status: false,
                content: "用户名或密码错误"
            }
        }
    } else {
        ctx.status = 400;
        ctx.body = {
            status: false,
            content: "用户名或密码不能为空"
        }
    }
})


/* 
    @route POST /signIn/register
    @aceess 公开的
    @desc 返回用户唯一识别id
 */

router.post('/register', async ctx => {
    let reqRes = ctx.request.body;
    if (reqRes && reqRes.phoneNum && reqRes.password) {
        let mongoResF = await mongoose.Users.findOne({ phoneNum: reqRes.phoneNum });
        if (!mongoResF) {
            let data = {
                userId: g.generateUserId(reqRes.phoneNum),
                phoneNum: reqRes.phoneNum,
                password: reqRes.password,
                name: `用户${reqRes.phoneNum}`
            }
            let mongoRes = await new mongoose.Users(data).save();
            ctx.body = {
                status: true,
                content: "注册成功",
                data: {
                    userId: data.userId
                }
            }
        } else {
            ctx.body = {
                status: false,
                content: '该手机号已被注册'
            }
        }
    } else {
        ctx.status = 400;
    }
})

/* 
    @route POST /signIn/verify
    @aceess 公开的
    @desc 返回用户token是否合法
 */
router.get('/verify', async ctx => {
    let token = ctx.query.token;
    let back = ctx.query.back;
    if (token) {
        try {
            let tokenDe = jwt.verify(token, config.privateKey);
            let mongRes = await mongoose.Users.findOne({ userId: tokenDe.userId });
            if (mongRes) {
                if (back) {
                    ctx.body = {
                        status: true,
                        conetnt: "token合法",
                        userId: tokenDe.userId
                    }
                } else {
                    ctx.body = {
                        status: true,
                        conetnt: "token合法"
                    }
                }
            } else {
                ctx.body = {
                    status: false,
                    conetnt: "用户ID不存在"
                }
            }
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                status: false,
                content: "token不合法或已过期"
            }
        }
    } else {
        ctx.status = 400;
    }
})

module.exports = router.routes();