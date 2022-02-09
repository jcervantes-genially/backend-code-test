import { Schema, model, connect } from 'mongoose';
const moongose = require('mongoose');

let presentationSchema = new moongose.Schema({
    description:{
        type:  String,
        require: true
    },
    title:{
        type:  String,
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

let Presentation = moongose.model('Presentation',presentationSchema);

module.exports = Presentation;

