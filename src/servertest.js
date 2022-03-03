const Koa = require('koa')
const app = new Koa
const log = require('../Utils/log')
const port = 8001
const Router = require('@koa/router')
const router = new Router
const fs = require('fs')
const ejs = require('koa-ejs')
const path = require('path')

ejs(app, {
    root: path.join(__dirname, 'static'),
    viewExt:'ejs',
    layout: false
})
router.get('/', async (ctx, next) => {
    const rawContent = fs.readFileSync(path.join(__dirname, 'static/index.html')).toString('utf8')
    ctx.body = rawContent
})

router.get('/about', async (ctx, next) => {
    //const auther = 'yoon'
    //const ip_list = '192.168.33.101'
    const auther = 'izure'
    const ip_list_raw = log.readFromLogFile()
    const ip_list = ip_list_raw.split(/\r\n|\n/)
    
    
    await ctx.render('about', {auther, ip_list})
})
  
app.use(async (ctx, next) => {
    log.writeLogFile(ctx.request.ip)

    await next()
})

app.use(router.routes())

app.use(router.allowedMethods())

//app.use(async (ctx) => {
//    ctx.body = 'Hello World!'
//})

app.listen(port, ()=>{
    console.log('server stated')
})