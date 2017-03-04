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
    yield CourseService.update(req.params.id, req.body);
    res.json({msg: "success"}, 200);
}

function* getSingle(req, res) {
    res.json(yield CourseService.getSingle(req.params.id));
}

function* deleteSingle(req, res) {
    yield CourseService.deleteSingle(req.params.id);
    res.json({
        "msg": "success"
    }, 200);
}