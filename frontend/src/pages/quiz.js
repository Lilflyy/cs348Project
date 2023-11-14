import { Fragment, useEffect, useState } from "react";
import ListQuizzes from "../component/ListQuizzes";
import CreateQuiz from "../component/CreateQuiz";
const Quiz = () => {
    const [isStudent, setIsStudent] = useState(false)
    const [isTeacher, setIsTeacher] = useState(false)
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [student, setStudent] = useState('')
    const [teacher, setTeacher] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const [view, setView] = useState(false)
    const [isAttempt, setIsAttempt] = useState(false)

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:4000/student", {
                method: "GET",
            })
            const jsonData = await response.json()
           
            setStudents(jsonData) 
         
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const fetchTeachers = async () => {
        try {
            const response = await fetch("http://localhost:4000/teacher", {
                method: "GET",
            })
            const jsonData = await response.json()
           
            setTeachers(jsonData) 
         
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const fetchQuizzes = async () => {
        
        try {
            setQuizzes([])
            const response = await fetch("http://localhost:4000/quiz", {
                method: "GET",
            })
            const jsonData = await response.json()
            
            setQuizzes(jsonData)
            console.log(quizzes)
            setView(true)
        } catch (error) {
            
        }
    }

    const fetchUnattempted = async () => {
        try {
            const response = await fetch("http://localhost:4000/unattempt/" + student.student_id, {
                method: "GET",
            })
            const jsonData = await response.json()
            setIsAttempt(true)
            setQuizzes(jsonData)
            console.log(quizzes)
            setView(true)
        } catch (error) {
            
        }
    }

    const fetchAttempted = async () => {
        try {
            setIsAttempt(false)
        } catch (error) {
            
        }
    }



    const dropDown = (e) => {
        setView(false)
        if (e.target.value == "") {
            console.log("nothing selected")
            setIsStudent(false)
            setIsTeacher(false)
            setSelectedStudent(false)
            setSelectedTeacher(false)
            setStudents([])
            setTeachers([])
        } else if (e.target.value == "student") {
            console.log("selected student")
            fetchStudents()
            setTeachers([])
            setIsStudent(true)
            setIsTeacher(false)
            setSelectedStudent(false)
            setSelectedTeacher(false)
        } else if (e.target.value == "teacher") {
            console.log("selected teacher")
            fetchTeachers()
            setStudents([])
            setIsStudent(false)
            setIsTeacher(true)
            setSelectedStudent(false)
            setSelectedTeacher(false)
        }
    }

    const studentDropDown = (e) => {
        if (e.target.value != "") {
            const s = JSON.parse(e.target.value)
            setStudent(s)
            setSelectedStudent(true)
            console.log(s)
        } else {
            setSelectedStudent(false)
        }
    }

    const teacherDropDown = (e) => {
        if (e.target.value != "") {
            const t = JSON.parse(e.target.value)
            setTeacher(t)
            setSelectedTeacher(true)
            console.log(t)
        } else {
            setSelectedTeacher(false)
        }
    }

    const viewCreated = async(id) => {
        try {
            setQuizzes([])
            const response = await fetch("http://localhost:4000/teacherquiz/" + id, {
                method: "GET",
            })
            const jsonData = await response.json()
            
            setQuizzes(jsonData)
            console.log(quizzes)
            setView(true)
        } catch (error) {
            
        }
    
    }

    return ( 
        <Fragment>
            <h1> Quiz Page </h1>
            <p>are you a:</p>
            <select onChange={dropDown}>
                <option value={""}></option>
                <option value={"student"}>Student</option>
                <option value={"teacher"}>Teacher</option>
            </select>
            {isStudent&& <select onChange={studentDropDown} className="ml-3">
                <option value={""}></option>
               {isStudent && students.map(student => (
                <option value={JSON.stringify(student)}>{student.email}</option>
            ))} 
            </select>
            }
            
            {isTeacher&& <select onChange={teacherDropDown} className="ml-3">
                <option value={""}></option>
               {isTeacher && teachers.map(teacher => (
                <option value={JSON.stringify(teacher)}>{teacher.email}</option>
            ))} 
            </select>}

            {selectedStudent && <button className="ml-2" onClick={() => {fetchAttempted()}}>attempted quizzes</button>}
            {selectedStudent && <button className="ml-2" onClick={()=>{fetchUnattempted()}}>unattempted quizzes</button>}
            {selectedTeacher && <button className="ml-2" onClick={() => {fetchQuizzes()}}>view all quizzes</button>}
            {selectedTeacher && <CreateQuiz teacher={teacher} fetch={fetchQuizzes}/>}
            {selectedTeacher && <button className="ml-2" onClick={() => {viewCreated(teacher.teacher_id)}}>view created quizzes</button>}
            {quizzes && view && <ListQuizzes data={quizzes} setData={setQuizzes} isStudent ={isStudent} isTeacher={isTeacher} student={student} isAttempt={isAttempt}/>}
           
            
        </Fragment>
       
        
     );
}
 
export default Quiz;