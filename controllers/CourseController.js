/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';

const CourseService = require('../services/CourseService');

module.exports = {
    create,
    update,
    getSingle,
    deleteSingle
};

function* create(req, res) {
    res.json(yield CourseService.create(req.body));
}

function* update(req, res) {
    const course = yield CourseService.update(req.params.id, req.body);
    if (course.error) res.json({"msg": "not found"}, 404);
    res.json({msg: "update success"}, 200);
}

function* getSingle(req, res) {
    const course = yield CourseService.getSingle(req.params.id);
    if (course.error) res.json({"msg": "not found"}, 404);
    res.json(course, 200);
}

function* deleteSingle(req, res) {
    const course = yield CourseService.deleteSingle(req.params.id);
    if (course.error) res.json({"msg": "not found"}, 404);
    res.json({"msg": "delete success"}, 200);
}