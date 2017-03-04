/**
 * Created by Jiravat on 17/2/2560.
 */
const InstituteService = require('../services/InstituteService');

module.exports = {
    create,
    update,
    getSingle,
    deleteSingle
};

function* create(req, res) {
    res.json(yield InstituteService.create(req.body));
}

function* update(req, res) {
    const institute = yield InstituteService.update(req.params.id, req.body);
    if (institute.error) res.json({"msg": "not found"}, 404);
    else res.json({"msg": "update success"}, 200);
}

function* getSingle(req, res) {
    const institute = yield InstituteService.getSingle(req.params.id);
    if (institute.error) res.json({"msg": "not found"}, 404);
    else res.json(institute, 200);
}

function* deleteSingle(req, res) {
    const institute = yield InstituteService.deleteSingle(req.params.id);
    if (institute.error) res.json({"msg": "not found"}, 404);
    else res.json({"msg": "delete success"}, 200);
}