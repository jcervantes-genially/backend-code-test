import { Int32 } from 'bson';
import { Schema, model, connect } from 'mongoose';
const moongose = require('mongoose');

let analyticsSchema = new moongose.Schema({
    type:{
        type:  String,
        require: true
    },
    number:{
        type: Number,
        require: true
    },
    deleted:{
        type: Boolean,
        require: true
    },
    createdAt:{
        type: Date
    },
    modifiedAt:{
        type: Date
    },
    deletedAt:{
        type:Date
    }

}, {
    versionKey: false
});

let Analytics = moongose.model('Analytics',analyticsSchema);

module.exports = Analytics;

