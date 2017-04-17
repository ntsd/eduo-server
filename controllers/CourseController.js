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
    const list_filter = {
        subject: String,
        level: Number,
        institute: String,
        price: {
            type: Number,
            op: '$lt'
        }
    }
    // const subject = req.query.subject || '';
    // const level = req.query.level || '';
    // const institute = req.query.institute || '';
    // const price = req.query.price || 2000
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;

    let filters = {}

    Object.keys(list_filter).forEach(name => {
        let _query = req.query[name]
        if (_query !== undefined && _query !== '') {
            if (list_filter[name].type === Number) {
                _query = parseInt(_query)
                if (list_filter[name].op !== undefined) {
                    filters[name] = {
                        [list_filter[name].op]: _query
                    }
                } else {
                    filters[name] = _query
                }
            } else {
                filters[name] = _query
            }
        }
    })

    try{
        const courses = Course.find(filters)
            .populate('institute')
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
