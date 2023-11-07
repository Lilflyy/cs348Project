import { Fragment, useEffect, useState } from "react";
import EditQuiz from "./EditQuiz";

const ListQuizzes = (data) => {

    const onAssign = async(id) => {
        const response = await fetch("http://localhost:4000/assign/" + id, {
                method:"GET",
            })
    }
    
    const onDelete = async(id) => {
        const response = await fetch("http://localhost:4000/quiz/" + id, {
                method:"DELETE",
            })
    }
    return (  
        <Fragment>
    <div>
            <table className="table">
    <thead>
      <tr>
        <th>Quiz name</th>
        <th>Created By</th>
        <th>Professor Email</th>
      </tr>
    </thead>
    <tbody>
      
      {data.data && data.data.map(quiz =>(
        <tr>
        <td>{quiz.quiz_name}</td>
        <td>{quiz.first_name} {quiz.last_name}</td>
        <td>{ quiz.email }</td>
        {data.isTeacher&&<td><button onClick={() => {onDelete(quiz.quiz_id)}}>delete</button></td>}
        {data.isTeacher&&<td><EditQuiz quiz={quiz}/></td>}
        {data.isTeacher&&<td><button onClick={() => {onAssign(quiz.quiz_id)}}>assign</button></td>}
      </tr>
      ))}
    </tbody>
  </table>

        </div>
        </Fragment>
    );
}
 
export default ListQuizzes;