/**
 * Created by Jiravat on 17/2/2560.
 */
'use strict';


const joi = require('joi');

const models = require('../models');

const Institute = models.Institute;

const _ = require('lodash');

function* getSingle(id){
    try {
        const institute = yield Institute.findOne({_id: id});
        return institute.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* create(entity){
    const created = yield Institute.create(entity);
    return created.toObject();
}

function* update(id, entity){
    try {
        const institute = yield Institute.findOne({_id: id});
        _.extend(institute, entity);
        yield institute.save();
        return institute.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* deleteSingle(id) {
    try{
        const institute = yield Institute.findOne({_id: id});
        yield institute.remove();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

module.exports = {
    getSingle,
    create,
    update,
    deleteSingle
};

