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
    if (course.error) res.status(404).json({"msg": "not found"});
    else res.json({msg: "update success"});
}

function* getSingle(req, res) {
    const course = yield CourseService.getSingle(req.params.id);
    if (course.error) res.status(404).json({"msg": "Course not found"});
    else res.json(course);
}

function* deleteSingle(req, res) {
    const course = yield CourseService.deleteSingle(req.params.id);
    if (course.error) res.status(404).json({"msg": "not found"});
    else res.json({"msg": "delete success"});
}

function* searchCourse(req, res) {
    var text = req.query.text;
    try{
        var courses = Course.find({$text: {$search: text}})
            .limit(10);
        courses.exec(function(err,courses){
            if(err)
                return res.json({"msg": "Search not found"}, 404);
            res.json(courses);
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
            res.json(courses);
        });

    }
    catch(e){
        return res.status(404).json({"msg": "error"});
    }
}
