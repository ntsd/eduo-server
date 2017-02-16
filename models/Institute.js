/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');

const InstituteSchema = new mongoose.Schema({

});

InstituteSchema.plugin(timestamps);

if (!InstituteSchema.options.toObject) {
    InstituteSchema.options.toObject = {};
}


InstituteSchema.options.toObject.transform = function (doc, ret, options) { // eslint-disable-line no-unused-vars
    const sanitized = _.omit(ret, '__v', '_id');
    sanitized.id = doc._id;
    return sanitized;
};

module.exports = {
    InstituteSchema,
};