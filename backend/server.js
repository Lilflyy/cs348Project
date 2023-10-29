require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
app.use(cors())
app.use(express.json())


// routes

// create teacher
app.post("/teacher", async(req, res) => {
    try{
        const {first_name, last_name, email} = req.body
        const newTeacher = await pool.query("INSERT INTO teacher (first_name,last_name, email) VALUES($1, $2, $3) RETURNING *", [first_name, last_name, email])
        res.json(newTeacher.rows[0])
        
    } catch(err) {
        console.log(err.message)
    }
})
// get all teachers
app.get("/teacher", async(req, res) => {
    try{
        const allteachers = await pool.query("SELECT * FROM teacher")
        
        res.json(allteachers.rows)
    } catch(err) {
        console.log(err.message)
    }
})

// get a teacher
app.get("/teacher/:id", async(req,res) => {
    try {
        const { id } = req.params
        const teacher = await pool.query("SELECT * FROM teacher WHERE teacher_id = $1", [id])
        res.json(teacher.rows[0])
    } catch (error) {
        console.log(err.message)
    }
})

// update teacher
app.put("/teacher/:id", async(req,res) => {
    try {
        const { first_name, last_name } = req.body
        console.log(req.body)
        const { id } = req.params
        
        const teacher = await pool.query("UPDATE teacher SET first_name = $1, last_name = $2 WHERE teacher_id = $3", [ first_name, last_name,id])
        
        res.json("teacher updated")
    } catch (err) {
        console.log(err.message)
    }
})

// delete teacher
app.delete("/teacher/:id", async(req,res) => {
    try {
        const { id } = req.params
        const teacher = await pool.query("DELETE FROM teacher WHERE teacher_id = $1", [id])
        res.json("deleted")
    } catch (error) {
        console.log(error.message)
    }
})

// create a student
app.post("/student", async(req, res) => {
    try{
        const {first_name, last_name, email} = req.body
        const newStudent = await pool.query("INSERT INTO student (first_name,last_name, email) VALUES($1, $2, $3) RETURNING *", [first_name, last_name, email])
        res.json(newStudent.rows[0])
        
    } catch(err) {
        console.log(err.message)
    }
})

// get all students
app.get("/student", async(req, res) => {
    try{
        const allstudents = await pool.query("SELECT * FROM student")
        
        res.json(allstudents.rows)
    } catch(err) {
        console.log(err.message)
    }
})

// quiz routes

// create quiz
app.delete("/quiz/:id", async(req, res) => {
    try{
        const { id } = req.params
        const { quiz_name } = req.body
        const newQuiz = await pool.query("INSERT INTO quiz (quiz_name, teacher_id) VALUES($1, $2) RETURNING *", [quiz_name, id])
        res.json(newQuiz.rows[0])
        
    } catch(err) {
        console.log(err.message)
    }
})

// delete quiz
app.post("/quiz/:id", async(req, res) => {
    try{
        const { id } = req.params
        const { quiz_name } = req.body
        const quiz = await pool.query("DELETE from quiz where quiz_id = $1", [id])
        
    } catch(err) {
        console.log(err.message)
    }
})
// assign student teacher relation
app.post("/st/:id/:teacherId", async(req, res) => {
    try {
        const ts = await pool.query("INSERT INTO studentTeacher(student_id, teacher_id) VALUES($1,$2) RETURNING *", [req.params.id, req.params.teacherId])
        res.json(ts.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// assign student quiz relation
app.post("/st/:id/:quizId", async(req, res) => {
    try {
        const ts = await pool.query("INSERT INTO studentQuiz(student_id, quiz_id) VALUES($1,$2) RETURNING *", [req.params.id, req.params.quizId])
        res.json(ts.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// view all quizzes for a student

// view un attempted quizzes for a student

// view assigned teacher for a student
app.get("/getTeachers/:id", async(req, res) => {
    try{
        const { id } = req.params
        const allt = await pool.query("SELECT DISTINCT first_name, last_name, email from teacher t join studentTeacher st on t.teacher_id = st.teacher_id where st.student_id = $1", [id])
        
        res.json(allt.rows)
    } catch(err) {
        console.log(err.message)
    }
})

// view assigned student 
app.get("/getStudents/:id", async(req, res) => {
    try{
        const { id } = req.params
        const allt = await pool.query("SELECT DISTINCT t.student_id, t.first_name, t.last_name, t.email from student t join studentTeacher st on t.student_id = st.student_id where st.teacher_id = $1", [id])
        
        res.json(allt.rows)
    } catch(err) {
        console.log(err.message)
    }
})

// view unenrolled teachers

app.get("/enrollTeacher/:id", async(req,res)=> {
    try {
        const {id} = req.params
        const et = await pool.query("select t.teacher_id, t.first_name, t.last_name, t.email from teacher t join (select teacher_id from teacher where teacher_id NOT IN (select st.teacher_id from studentteacher st where st.student_id = $1)) AS st on t.teacher_id = st.teacher_id", [id])
        res.json(et.rows)
    } catch (error) {
        console.log(error.message)
    }
    
})

// enroll a student to a teacher
app.post("/enroll/:id/:teacher_id", async(req,res) => {
    try {
        const enroll = await pool.query("INSERT INTO studentteacher(student_id, teacher_id) VALUES($1, $2) RETURNING *", [req.params.id, req.params.teacher_id])
        res.json(enroll.rows[0])
        
    } catch (error) {
        console.log(error.message)
    }
}) 


app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})
