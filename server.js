const express = require('express');
const app = express();
const studentRouter = require('./Routes/StudentRouter');
const teacherRouter = require('./Routes/TeacherRouter');
const instituteRouter = require('./Routes/InstituteRouter');
const courseRouter = require('./Routes/CourseRouter');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json())

app.use('/api/student',studentRouter)
app.use('/api/teacher',teacherRouter)
app.use('/api/institute',instituteRouter)
app.use('/api/course',courseRouter)

// app.get('/',(req, res)=>{
//     res.send("Server Chal raha hai")
// })


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log('server listening on 4000 and database is connnected');
    })

}).catch((err)=>{
    console.log("Database not connection established", err);
})
