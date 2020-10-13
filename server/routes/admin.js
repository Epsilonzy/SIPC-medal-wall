const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwtVerify = require('./module/verify');
const g = require('../config/generateId');
const time = require('../config/time');
const check = require('./module/check');

/*
   @route get /admin/
   @desc 根据用户信息（手机号）获得勋章详情信息
   @access 接口是私有的，需要token验证
*/

//验证部分
router.use(async(ctx, next) => {
    if (Object.getOwnPropertyNames(ctx.request.body).length === 0) {
        ctx.status = 400;
    } else {
        await next();
    }
});

router.use(async(ctx, next) => {
    let token = ctx.request.body.token;
    let jwtRes = await jwtVerify(token, "admin");
    if (jwtRes.status) {
        await next();
    } else {
        ctx.body = jwtRes;
    }
});

//获得所有medal及详情信息
router.post('/getMedalsAll', async ctx => {
    let sqlRes = await mongoose.Medals.find({});
    ctx.body = {
        content: "获取成功",
        status: true,
        data: sqlRes
    };
});
//改变选中medal及详情信息
router.post('/changeMedal', async ctx => {
    let reqData = ctx.request.body;
    if (check.checkGetMedalsFormat(reqData)) {
        let sqlRes = await mongoose.Medals.updateOne({ _id: reqData._id }, reqData).catch(err => {
            ctx.body = {
                status: false,
                content: err
            }
        });
        if (sqlRes) {
            ctx.body = {
                status: true,
                content: "修改成功"
            }
        } else {
            ctx.body = {
                status: false,
                content: "修改失败"
            }
        }
    } else {
        ctx.status = 400;
    }
});
//添加一个medal
router.post('/addMedal', async ctx => {
    let reqData = ctx.request.body;
    if (check.checkGetMedalsFormat(reqData)) {
        let sqlRes = await new mongoose.Medals(reqData).save().catch(err => {
            ctx.status = 400;
            console.log(err);
        });
        console.log('/addMedal,sqlRes:' + sqlRes);
        if (sqlRes) {
            ctx.body = {
                status: true,
                content: "添加成功"
            }
        } else {
            ctx.body = {
                status: false,
                content: "添加失败"
            }
        }
    } else {
        ctx.status = 400;
    }
});
//删除一个medal
router.post('/deleteMedal', async ctx => {
    let reqData = ctx.request.body;
    let sqlRes = await mongoose.Medals.deleteOne({ _id: reqData._id });
    if (sqlRes.ok) {
        ctx.body = {
            status: true,
            content: "修改成功"
        }
    } else {
        ctx.body = {
            status: false,
            content: "修改失败"
        }
    }
});

// router.post('/show', async ctx => {

// })



module.exports = router.routes();