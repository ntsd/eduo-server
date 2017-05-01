const router = require('koa-router')()
// const api = require('./api/')
// router.use('/api', api.routes())

router.use(require('./api/v1/index').routes())

router.get('/', async function (ctx, next) {
  ctx.body = 'Hello world'
})

module.exports = router