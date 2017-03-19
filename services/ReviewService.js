'use strict';

const models = require('../models');

const Review = models.Review;

const _ = require('lodash');

module.exports = {
    create,
    update,
    deleteSingle,
    getAllByCourse
};

function* create(entity) {
    const created = yield Review.create(entity);
    return created.toObject();
}

function* deleteSingle(id) {
    try{
        const course = yield Review.findOne({_id: id});
        yield course.remove();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* update(id, entity){
    try{
        const course = yield Review.findOne({_id: id});
        _.extend(course, entity);
        yield course.save();
        return course.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* getAllByCourse(id, entity){
    try{
        const course = yield Review.findOne({_id: id});
        _.extend(course, entity);
        yield course.save();
        return course.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}