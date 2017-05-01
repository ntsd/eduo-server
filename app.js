'use strict'

const Koa = require('koa')
const app = new Koa()
const adapt = require('koa-adapter')
const json = require('koa-json')
const jwt = require('koa-jwt')
const router = require('koa-router')()

// import routes
const index = require('./routes/index')

app.use(require('koa-etag')())
app.use(json())
app.use(require('koa-static')(__dirname + '/public'));

app.use(require('koa-compress')({
  flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(require('koa-bodyparser')({
  // BodyParser options here
}))

// Error handlers
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    const errCode = err.statusCode || err.status || 500
    ctx.status = errCode
    if (err.status == 401) {
      ctx.body = {
        message: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.body = {
        message: err.message
      }
    }
  }
})

// Add jwt middleware
app.use(jwt({
  secret: process.env.JWT_SECRET || 'USE .env AND CHANGE JWT_SECRET',
  passthrough: true
}).unless({ path: [/^\/public/] }))

// App use router
app.use(index.routes())

module.exports = app
