/**
 * Created by Jiravat on 17/2/2560.
 */
'use strict';


const joi = require('joi');

const models = require('../models');

const Institute = models.Institute;

const _ = require('lodash');

function* getSingle(id){
    const institute = yield Institute.findOne({_id: id});
    if (!institute) {
        throw new errors.NotFoundError(`dont' have institute , id = ${id}`);
    }
    return institute.toObject();
}

function* create(entity){
    const created = yield Institute.create(entity);
    return created.toObject();
}

function* update(id, entity){
    const institute = yield Institute.findOne({_id: id});
    if (!institute) {
        throw new errors.NotFoundError('Mission not found');
    }
    _.extend(institute, entity);
    yield institute.save();
    return institute.toObject();
}

function* deleteSingle(id) {
    const institute = yield Institute.findOne({_id: id});
    if (!institute) {
        throw new errors.NotFoundError(`Does not have this institute , id = ${id}`);
    }
    yield institute.remove();
}

module.exports = {
    getSingle,
    create,
    update,
    deleteSingle
};

