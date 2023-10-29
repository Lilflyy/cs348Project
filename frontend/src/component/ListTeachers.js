import React, {Fragment, useEffect, useState} from "react";
const ListTeachers = () => {
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [teacher, setTeacher] = useState()
    const [view, setView] = useState(false)
    const getTeachers = async ()=> {
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

    useEffect(() => {
        getTeachers()
    })

    const dropDown =(e) => {
        if (e.target.value != "") {
        setView(true)
        const teacher = JSON.parse(e.target.value)
        
        setTeacher(teacher)
        console.log("teacher id:", teacher.teacher_id)
        } else {
            setView(false)
            setStudents([])
        }
    }

    const getStudents = async () => {
        try {
            const response = await fetch("http://localhost:4000/getStudents/" + teacher.teacher_id, {
                method: "GET",
            })
            const jsonData = await response.json()
            setStudents(jsonData)
        } catch (err) {
            console.log(err.message)
        }
    }

    return ( 
        <Fragment>
            <table className="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      
      {teachers.map(teacher =>(
        <tr>
        <td>{teacher.first_name}</td>
        <td>{teacher.last_name}</td>
        <td>{ teacher.email }</td>
        <td>delete</td>
        <td>edit</td>
      </tr>
      ))}
    </tbody>
  </table>
        <h1>Who are you</h1>
        <select onChange={dropDown}>
            <option value={""}></option>
            {teachers.map(teacher => (
                <option
                value={JSON.stringify(teacher)}>{teacher.email}</option>
                
            ))}
        </select>
        {view && <button onClick={() => getStudents()}> view students </button>}
        {students.length != 0 && students.map(student => (
             <table className="table">
             <thead>
               <tr>
                 <th>Firstname</th>
                 <th>Lastname</th>
                 <th>Email</th>
               </tr>
             </thead>
             <tbody>
               
               {students.map(student =>(
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
        ))}

        </Fragment>
        
     );
}
 
export default ListTeachers