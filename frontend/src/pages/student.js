import React, {Fragment, useEffect, useState} from "react";
import { json } from "react-router-dom";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [student, setStudent] = useState()
    const [teachers, setTeachers] = useState([])
    const [view, setView] = useState(false)
    const [enroll, setEnroll] = useState(false)
    const [instructor, setInstructor] = useState(false)
    
    const getStudents = async () => {
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

    const getTeachers = async () => {
        setEnroll(false)
        setInstructor(true)
        try {
            console.log(student.student_id)
            const response = await fetch("http://localhost:4000/getTeachers/" + student.student_id, {
                method:"GET"
            })
            const jsonData = await response.json()
            
            setTeachers(jsonData)
        } catch (err) {
            console.log(err.message)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const body = {first_name, last_name, email}
        try {
            const response = await fetch("http://localhost:4000/student", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) 
            })
            const jsonData = await response.json()
            console.log(jsonData)
            setFirst_name('')
            setLast_name('')
            setEmail('')
         
            
        } catch (error) {
            console.log(error.message)
        }
    }
    const onEnroll = async () => {
        setEnroll(true)
        setInstructor(false)
        try {
            const response = await fetch("http://localhost:4000/enrollTeacher/" + student.student_id, {
                method: "GET"
            })
            const jsonData = await response.json()
            console.log(jsonData)
            setTeachers(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getStudents()
    })

    const dropDown =(e) => {
        if (e.target.value != "") {
        setView(true)
        const s = JSON.parse(e.target.value)
        console.log(s)
        setStudent(s)
        } else {
            setView(false)
            setInstructor(false)
            setEnroll(false)
            setStudent()
            setTeachers([])
        }
    }

    const enrollClick = async (teacher) => {
        try {
            const response = await fetch("http://localhost:4000/enroll/" + student.student_id + "/" + teacher.teacher_id, {
                method: "POST"
            })
            if (response.ok) {
                onEnroll()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return ( 
        <Fragment>
            <h1>Student Page</h1>
            <h1 className="text-center"> add student</h1>
            <form className="mt-5" onSubmit={onSubmit}>
                <h>first name</h>
                <input type="text" className="form-control" value={first_name} onChange={e => setFirst_name(e.target.value)}></input>
                
                <h>last name</h>
                <input type="text" className="form-control" value={last_name} onChange={e => setLast_name(e.target.value)}></input>
                <h>email</h>
                <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                <button className="btn btn-success">add</button>
            </form>

        <table className="table">
<thead>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Email</th>
  </tr>
</thead>
<tbody>
  
  {students.length !=0 &&students.map(student =>(
    <tr>
    <td>{student.first_name}</td>
    <td>{student.last_name}</td>
    <td>{ student.email }</td>
    <td>delete</td>
    <td>edit</td>
  </tr>
  ))}
</tbody>
</table>

<p>select your student email</p>
<select onChange={dropDown}>
            <option value={""}></option>
            {students.map(student => (
                <option
                value={JSON.stringify(student)}>{student.email}</option>
                
            ))}
        </select>
        

        {view && <button onClick={() => getTeachers()}> view instuctors </button>}
        {view && <button onClick={() => onEnroll()}>Enroll</button>}
        {enroll && (
            <p> choose a instructor to enroll </p>

        )}
        {view && teachers.length!= 0 && (
            <table className="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
               
               {teachers.length != 0 && teachers.map(teacher =>(
                 <tr>
                 <td>{teacher.first_name}</td>
                 <td>{teacher.last_name}</td>
                 <td>{teacher.email }</td>
                 {instructor &&
                 <td>delete</td>
                 
                 }
                 
                 {enroll && <td><button onClick={() => {enrollClick(teacher)}}>enroll</button></td>}
               </tr>
               ))}
             </tbody>

            </table>
        )}
        
        


        
   

    </Fragment>
        

     );
}
 
export default Student;