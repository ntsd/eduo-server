/**
 * Created by Jiravat on 17/2/2560.
 */
const InstituteServiceService = require('../services/InstituteService');

module.exports = {
    create,
    update,
    getSingle,
};

function* create(req, res) {
    res.json(yield InstituteServiceService.create(req.body));
}

function* update(req, res) {
    res.json(yield InstituteServiceService.update(req.params.id, req.body));
}

function* getSingle(req, res) {
    res.json(yield InstituteServiceService.getSingle(req.params.id));
}