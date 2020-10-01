//依赖
const Koa = require('koa'),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    app = new Koa(),
    router = new Router();

//路由引入
const signIn = require('./routes/signIn.js');
const news = require('./routes/news.js');
const users = require('./routes/users');
const community = require('./routes/community');
const chat = require('./routes/chat');

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
app.use(bodyParser());

//配置路由
app.use(router.routes()).use(router.allowedMethods);

//路由

router.get('/', async ctx => {
    ctx.body = { msg: `智能医疗问答系统` };
})
router.get('/connect', async ctx => {
    ctx.body = {
        status: true,
        content: '服务器连接成功'
    }
})

//进行路由注册
router.use('/signIn', signIn);
router.use('/news', news);
router.use('/users', users);
router.use('/community', community);
router.use('/chat', chat);

//配置端口
const port = process.env.PORT || 8082;

app.listen(port, '0.0.0.0', () => console.log(`server is running on port ${port}`));