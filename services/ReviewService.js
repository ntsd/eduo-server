'use strict';

const models = require('../models');

const Review = models.Review;

const Course = models.Course;

const _ = require('lodash');

module.exports = {
    create,
    updateSingle,
    deleteSingle,
    addReview,
    getSingle
};

function* create(entity) {
    const review = yield Review.create(entity);
    return review.toObject();
}

function* deleteSingle(id) {
    try{
        const review = yield Review.findOne({_id: id});
        yield review.remove();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* updateSingle(id, entity){
    try{
        const review = yield Review.findOne({_id: id});
        _.extend(review, entity);
        yield review.save();
        return review.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}

function* getAllByCourse(id, entity){
    try{
        const review = yield Review.findOne({_id: id});
        _.extend(review, entity);
        yield review.save();
        return review.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}


function* addReview(courseId ,reviewEntity){//not done
    try{
        const review = yield create(reviewEntity);
        const course = yield Course.findById(courseId, function(err, course) {
            if (err) return console.log(err);
            course.reviews.push(review.id);
            course.save(function(err) {
                if (err) return console.log(err);
            });
        });
        yield course.save();
        return review;
    }
    catch(e){
        console.log(e);
        return {
            error: true,
        };
    }
}

function* getSingle(id) {
    try{
        const review = yield Review.findOne({_id: id});
        return review.toObject();
    }
    catch(e){
        return {
            error: true,
        };
    }
}