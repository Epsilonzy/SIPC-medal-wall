const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwt = require('jsonwebtoken');
const g = require('../config/generateId');
const time = require('../config/time');


/* 
    @route POST /signIn/login
    @aceess 公开的
    @desc 返回token
 */

router.post('/login', async ctx => {
    let phoneNumber = ctx.request.body.phoneNumber;
    //数据库部分
    // let sqlRes = await mongoose.Users.find({phoneNumber:phoneNumber});

    if (1) {
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
})

/* 
    @route POST /signIn/verify
    @aceess 公开的
    @desc 返回用户token是否合法
 */
router.get('/verify', async ctx => {
    let token = ctx.query.token;
    if (token) {
        try {
            let tokenDe = jwt.verify(token, config.privateKey);
            if (time.isOverTime(tokenDe.iat)) {
                ctx.body = {
                    status: false,
                    content: "token已过期"
                }
            } else {
                // let mongRes = await mongoose.Users.findOne({ phoneNumber: tokenDe.phoneNumber });
                if (1) {
                    ctx.body = {
                        status: true,
                        conetnt: "token合法",
                        tokenDe: tokenDe
                    }
                } else {
                    ctx.body = {
                        status: false,
                        conetnt: "手机号不存在"
                    }
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