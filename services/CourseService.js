/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';


const joi = require('joi');

const models = require('../models');

const Course = models.Course;

const _ = require('lodash');

module.exports = {
    create,
    update,
    getAll,
    getSingle,
    deleteSingle,
    search
};

const courseCreatorUpdateEntityJoi = joi.object().keys({
    subject: joi.string().required(),
    description: joi.string(),
    hour : joi.number(),
    price: joi.number(),
    promotion_price: joi.number(),
    teacher: joi.string(),
    startDate: joi.date().timestamp(),
    endDate: joi.date().timestamp(),
    email : joi.string(),
    study_times: joi.number(),
    courseTime: joi.number(),
    rating: joi.number(),
    address: joi.string(),
    website: joi.string(),
    phone: joi.string(),
    tags: joi.array(),
    images: joi.string(),
    institute: joi.string()
}).required();

create.schema = {
    entity: courseCreatorUpdateEntityJoi
};

function* create(entity) {
    const created = yield Course.create(entity);
    return created.toObject();
}

function* update(id, entity){
    try{
        const course = yield Course.findOne({_id: id});
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

function* getSingle(id) {
    try {
        const course = yield Course.findOne({_id: id});
        return course.toObject();
    } catch (e) {
        return {
            error: true,
        };
    }

}

function* getAll() {

}

function* deleteSingle(id) {
    try{
        const course = yield Course.findOne({_id: id});
        yield course.remove();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* search(text, number){
    var regex = new RegExp(text);
    yield  Course.find({$text: {$search: regex}})
        .limit(number)
        .exec(function(err, docs) {
            if(err){
                return {
                    error: true,
                };
            }
            return docs;

        });
}