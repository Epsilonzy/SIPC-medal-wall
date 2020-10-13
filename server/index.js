//依赖
const Koa = require('koa'),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    app = new Koa(),
    router = new Router(),
    formid = require('koa2-formidable'),
    jwt = require('jsonwebtoken'),
    fs = require('fs');

//路由引入
const getMedals = require('./routes/getMedals');
const signIn = require('./routes/signIn');
const admin = require('./routes/admin');

//跨域设置
app.use(async(ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

//静态文件目录设置
app.use(require('koa-static')(__dirname, 'static'));

//全局路由配置
// app.use(formid());
app.use(bodyParser());
//配置路由
app.use(router.routes()).use(router.allowedMethods);

//路由

//进行路由注册
router.get('/', async ctx => {
    let html = fs.readFileSync('./index.html');
    ctx.body = html;
    ctx.type = "text/html;charset=utf-8";
})
router.use('/getMedals', getMedals);
router.use('/signIn', signIn);

router.use('/admin', admin);

//配置端口
const port = process.env.PORT || 8088;

app.listen(port, '0.0.0.0', () => console.log(`server is running on port ${port}`));