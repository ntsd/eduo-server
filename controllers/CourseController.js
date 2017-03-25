/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';

const CourseService = require('../services/CourseService');
const models = require('../models');

const Course = models.Course;

module.exports = {
    create,
    updateSingle,
    getSingle,
    deleteSingle,
    searchCourse,
    getCourses
};

function* create(req, res) {
    req.body.createBy = req.auth.sub;
    res.json(yield CourseService.create(req.body));
}

function* updateSingle(req, res) {
    const course = yield CourseService.update(req.params.id, req.body);
    if (course.error) res.json({"msg": "not found"}, 404);
    else res.json({msg: "update success"}, 200);
}

function* getSingle(req, res) {
    const course = yield CourseService.getSingle(req.params.id);
    if (course.error) res.json({"msg": "Course not found"}, 404);
    else res.json(course, 200);
}

function* deleteSingle(req, res) {
    const course = yield CourseService.deleteSingle(req.params.id);
    if (course.error) res.json({"msg": "not found"}, 404);
    else res.json({"msg": "delete success"}, 200);
}

function* searchCourse(req, res) {
    var text = req.query.text;
    try{
        var courses = Course.find({$text: {$search: text}})
            .limit(10);
        courses.exec(function(err,courses){
            if(err)
                return res.json({"msg": "Search not found"}, 404);
            res.json(courses, 200);
        });

    }
    catch(e){
        return res.json({"msg": "error"}, 404);
    }
}

function* getCourses(req, res) {
    const subject = req.query.subject || '';
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;

    let find = {}
    if (subject !== '') {
        find.subject = subject
    }
    try{
        const courses = Course.find(find)
            .skip(page*limit)
            .limit(limit)
            .sort( {'createdAt':-1});
        courses.exec(function(err,courses){
            if(err)
                return res.json({"msg": "Search not found"}, 404);
            res.json(courses, 200);
        });

    }
    catch(e){
        return res.json({"msg": "error"}, 404);
    }
}
