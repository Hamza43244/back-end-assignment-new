const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    fee:{
        type: String,
        required: true
    },
    shortName:{
        type: String,
        required: true
    },

})

const courseModel = mongoose.model('course',CourseSchema)

module.exports = courseModel