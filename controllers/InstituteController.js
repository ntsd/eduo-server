/**
 * Created by Jiravat on 17/2/2560.
 */
const InstituteService = require('../services/InstituteService');

module.exports = {
    create,
    update,
    getSingle,
};

function* create(req, res) {
    res.json(yield InstituteService.create(req.body));
}

function* update(req, res) {
    res.json(yield InstituteService.update(req.params.id, req.body));
}

function* getSingle(req, res) {
    res.json(yield InstituteService.getSingle(req.params.id));
}