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
//     courseId: joi.number(),
//     name: joi.string(),
//     description: joi.string(),
//     price: joi.number(),
//     teacher: joi.string(),
//     startDate: joi.number().positive().required().strict(),
//     endDate: joi.number().positive().required().strict(),
//     email : joi.string(),
//     courseTime: joi.number(),
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