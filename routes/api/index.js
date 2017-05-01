const Router = require('koa-router')
const apiV1 = require('./v1/')
let api = new Router()

api.use('/v1', apiV1.routes())

module.exports = api
