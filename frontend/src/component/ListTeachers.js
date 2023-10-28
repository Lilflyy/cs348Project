import React, {Fragment, useEffect, useState} from "react";
const ListTeachers = () => {
    const [teachers, setTeachers] = useState([])
    const getTeachers = async ()=> {
        try {
            const response = await fetch(" http://localhost:4000/teacher", {
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
        const teacher = JSON.parse(e.target.value)
        console.log("teacher id:", teacher.teacher_id)
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
            {teachers.map(teacher => (
                <option
                value={JSON.stringify(teacher)}>{teacher.email}</option>
            ))}
        </select>
        <p>your students:</p>

        </Fragment>
        
     );
}
 
export default ListTeachers