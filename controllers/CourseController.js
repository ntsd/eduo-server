/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';

const CourseService = require('../services/CourseService');

module.exports = {
    create,
    update,
    getSingle,
};

function* create(req, res) {
    res.json(yield CourseService.create(req.body));
}

function* update(req, res) {
    res.json(yield CourseService.update(req.params.id, req.body));
}

function* getSingle(req, res) {
    res.json(yield CourseService.getSingle(req.params.id));
}