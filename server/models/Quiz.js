const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question : {type : String, required : true},
    options : {type : Array, required : true},
    answer : {type : Number, required : true},
    level : {type : Number, required : true},
    points : {type : Number, required : true},
    topic: { type: String, required: true },
});

module.exports = mongoose.model('Quiz', QuizSchema);
