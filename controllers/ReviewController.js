/**
 * Created by Jiravat on 3/23/2017.
 */
const ReviewService = require('../services/ReviewService');
const models = require('../models');


module.exports = {
    createSingle,
    updateSingle,
    getSingle,
    deleteSingle
};

function* createSingle(req, res) {

    const review = yield ReviewService.addReview(req.params.id, req.body);
    if(review.error)res.json({"msg": "not create"}, 304);
    else{res.json({"msg": "create success"}, 201);}
}

function* updateSingle(req, res) {
    const review = yield ReviewService.update(req.params.id, req.body);
    if (review.error) res.json({"msg": "not found"}, 404);
    else res.json({msg: "update success"}, 200);
}

function* deleteSingle(req, res) {
    const review = yield ReviewService.deleteSingle(req.params.id);
    if (review.error) res.json({"msg": "not found"}, 404);
    else res.json({"msg": "delete success"}, 200);
}

function* getSingle(req, res) {
    const review = yield ReviewService.getSingle(req.params.id);
    if (review.error) res.json({"msg": "not found"}, 404);
    else res.json(review, 200);
}