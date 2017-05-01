const Router = require('koa-router')

const review = new Router()

review.get('/', async (ctx) => {
  ctx.body = `Hello /api/v1/review`
})

module.exports = review