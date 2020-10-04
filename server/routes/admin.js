const router = require('koa-router')();
const mongoose = require('../config/mongoDB');
const config = require('../config/info.json');
const jwt = require('jsonwebtoken');
const g = require('../config/generateId');
const time = require('../config/time');

router.use(async(ctx, next) => {
    console.log('*');
    await next();
})

router.get('/', async ctx => {
    console.log('/');
})

// router.post('/show', async ctx => {

// })



module.exports = router.routes();