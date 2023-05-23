const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
          
        type: String,
        required: true

    },
    contact:{
        type: String,
        required: true
    },
    course:{
        type: Number,
        required: true
    },
    
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

const studentModel = mongoose.model('student',StudentSchema)

module.exports = studentModel