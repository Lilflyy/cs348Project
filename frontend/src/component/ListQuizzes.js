import { Fragment } from "react";

const ListQuizzes = (data) => {
 
    return (  
        
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
      
      {data.data.length !== 0 && data.data.map(quiz =>(
        <tr>
        <td>{quiz.quiz_name}</td>
        <td>{quiz.first_name} {quiz.last_name}</td>
        <td>{ quiz.email }</td>
        {data.isTeacher&&<td>delete</td>}
        {data.isTeacher&&<td>edit</td>}
        {data.isTeacher&&<td>assign</td>}
      </tr>
      ))}
    </tbody>
  </table>

        </div>

    );
}
 
export default ListQuizzes;