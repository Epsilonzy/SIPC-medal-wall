const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwt = require('jsonwebtoken');
const g = require('../config/generateId');
/*
   @route get /getMedals/
   @desc 获取用户ID接口
   @access 接口是公开的
 */
router.get('/', async ctx => {
    let token = ctx.query.token;
    console.log(token);
    ctx.body = {
        username: '牛梓雨',
        medalsGet: [{
            medalUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601624251283&di=8c96ea316195d38995fc86d71f13465b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F17%2F09%2F25%2F83b471835fa29c1ea07483fd2f9c0a8a.jpg",
            medalName: "新人勋章",
            content: "这是一枚新人勋章"
        }, {
            medalUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601624251283&di=8c96ea316195d38995fc86d71f13465b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F17%2F09%2F25%2F83b471835fa29c1ea07483fd2f9c0a8a.jpg",
            medalName: "新人勋章",
            content: "这是一枚新人勋章"
        }, {
            medalUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601624251283&di=8c96ea316195d38995fc86d71f13465b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F17%2F09%2F25%2F83b471835fa29c1ea07483fd2f9c0a8a.jpg",
            medalName: "新人勋章",
            content: "这是一枚新人勋章"
        }],
        medalsGetNot: [{
            medalUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601624251283&di=8c96ea316195d38995fc86d71f13465b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F17%2F09%2F25%2F83b471835fa29c1ea07483fd2f9c0a8a.jpg",
            medalName: "新人勋章",
            content: "这是一枚新人勋章"
        }],
        medalsGetNew: [{
            medalUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601624251283&di=8c96ea316195d38995fc86d71f13465b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F17%2F09%2F25%2F83b471835fa29c1ea07483fd2f9c0a8a.jpg",
            medalName: "新人勋章",
            content: "这是一枚新人勋章"
        }, {
            medalUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601624251283&di=8c96ea316195d38995fc86d71f13465b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F17%2F09%2F25%2F83b471835fa29c1ea07483fd2f9c0a8a.jpg",
            medalName: "新人勋章",
            content: "这是第二枚新人勋章"
        }],
        medalsGetCnt: 3,
        medalsGetNotCnt: 10
    }
})


module.exports = router.routes();