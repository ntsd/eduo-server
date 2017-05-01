const Router = require('koa-router')
const helpers = require('../../../common/helpers')

const course = new Router()

/**
 * Get all courses with filter options
 */
course.get('/', async (ctx, next) => {
  ctx.body = `Hello, Course`
})

/**
 * Get a reviews by course ID
 */
course.get('/:id/review', async (ctx) => {
  const id = helpers.filterInt(ctx.params.id)
  ctx.body = `${id} Review`
})

/**
 * Get a course information by course ID
 */
course.get('/:id', async (ctx, next) => {
  const id = helpers.filterInt(ctx.params.id)
  if (isNaN(id)) {
    ctx.body = 'Fail.'
  } else {
    ctx.body = `${id} Pass.`
  }
})

module.exports = course
