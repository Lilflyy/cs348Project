import React, {Fragment, useEffect, useState} from "react";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    
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

    useEffect(() => {
        getStudents()
    })
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
   

    </Fragment>
        

     );
}
 
export default Student;