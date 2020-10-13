const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwt = require('jsonwebtoken');
const g = require('../config/generateId');
const jwtVerify = require('./module/verify');
const { Medals } = require('../config/mongoDB');
/*
   @route get /getMedals/
   @desc 根据用户信息（手机号）获得勋章详情信息
   @access 接口是私有的，需要token验证
*/
router.use(async(ctx, next) => {
    // console.log(ctx.query.token);
    let verifyRes = await jwtVerify(ctx.query.token, "getMedals");
    if (verifyRes.status) {
        ctx.user = verifyRes.user;
        await next();
    } else {
        ctx.body = verifyRes;
    }
});

router.get('/', async ctx => {
    let mongoRes = await mongoose.Medals.find({});
    let medalsGet = [],
        medalsGetNew = [],
        medalsGetNot = [];
    // console.log(ctx.user);
    mongoRes.forEach(item => {
        if (ctx.user.getMedalsNew.indexOf(item.medalId) != -1) {
            medalsGetNew.push({
                medalsId: item.medalsId,
                medalName: item.medalName,
                content: item.content,
                imgUrl: item.imgUrl
            })
        }
        if (ctx.user.getMedals.indexOf(item.medalId) == -1) {
            medalsGetNot.push({
                medalsId: item.medalsId,
                medalName: item.medalName,
                content: item.content,
                imgUrl: item.imgUrl
            })
        } else {
            medalsGet.push({
                medalsId: item.medalsId,
                medalName: item.medalName,
                content: item.content,
                imgUrl: item.imgUrl
            })
        }
    });
    if (ctx.user.getMedalsNew.length != 0) {
        mongoose.Users.updateOne({
            phoneNumber: ctx.user.phoneNumber
        }, {
            getMedalsNew: []
        }).then(data => {
            console.log(data);
        })
    }
    ctx.body = {
        name: ctx.user.name,

        medalsGet: medalsGet,
        medalsGetNot: medalsGetNot,
        medalsGetNew: medalsGetNew,
        medalsGetCnt: medalsGet.length,
        medalsGetCntAll: mongoRes.length
    }
})


module.exports = router.routes();