/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';


const joi = require('joi');

const models = require('../models');

const Course = models.Course;

const _ = require('lodash');

// Exports
module.exports = {
    create,
    update,
    getAll,
    getSingle
};

// const courseCreatorUpdateEntityJoi = joi.object().keys({
//     subject: joi.string().required(),
//     description: joi.string(),
//     hour : joi.number(),
//     price: joi.number(),
//     promotion_price: joi.number(),
//     teacher: joi.string(),
//     startDate: joi.date().timestamp(),
//     endDate: joi.date().timestamp(),
//     email : joi.string(),
//     study_times: joi.number(),
//     courseTime: joi.number(),
//     rating: joi.number(),
//     address: joi.string(),
//     website: joi.string(),
//     phone: joi.string(),
//     tags: joi.array(),
//     images: joi.string(),
//     institute: joi.string()
// }).required();
//
// create.schema = {
//     entity: courseCreatorUpdateEntityJoi
// };

function* create(entity) {
    const created = yield Course.create(entity);
    return created.toObject();
}

function* update(id, entity){
    const course = yield Course.findOne({_id: id});
    if (!course) {
        throw new errors.NotFoundError('Mission not found');
    }
    _.extend(course, entity);
    yield course.save();
    return course.toObject();
}

function* getSingle(id) {
    const course = yield Course.findOne({courseId: id});
    if (!course) {
        throw new errors.NotFoundError(`dont' have course , id = ${id}`);
    }
    return course.toObject();
}

function* getAll() {

}