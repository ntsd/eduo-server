/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';


const joi = require('joi');

const models = require('../models');

const Course = models.Course;
const helper = require('../common/helper');
const errors = require('common-errors');
const _ = require('lodash');

// Exports
module.exports = {
    create,
    update,
    getAll,
    getAllByName,
    getByName,
    getById
};

const courseCreatorUpdateEntityJoi = joi.object().keys({
    courseId: joi.number(),
    name: joi.string(),
    description: joi.string(),
    price: joi.number(),
    teacher: joi.string(),
    startDate: joi.number().positive().required().strict(),
    endDate: joi.number().positive().required().strict(),
    email : joi.string(),
    courseTime: joi.number(),
}).required();

create.schema = {
    entity: courseCreatorUpdateEntityJoi
};

function* create(courseId, entity) {
    if (!entity.status) {
        entity.status = DroneStatus.IDLE_READY;
    }

    entity.provider = providerId;
    const created = yield Drone.create(entity);
    return created.toObject();
}

