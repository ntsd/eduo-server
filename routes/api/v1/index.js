const Router = require('koa-router')
const course = require('./course')
const review = require('./review')

const r = new Router({ prefix: '/api/v1' })

r.use('/course', course.routes(), course.allowedMethods())
r.use('/review', review.routes(), review.allowedMethods())

module.exports = r
