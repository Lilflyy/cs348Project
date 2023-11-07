import { Fragment, useState } from "react";

const CreateQuiz = ({teacher}) => {
    const [quiz_name, setQuiz_name] = useState('')
    const onCreate = async (e) => {
        e.preventDefault()
        const body = {quiz_name}
        try {
            const body = {quiz_name}
            const response = await fetch("http://localhost:4000/quiz/" + teacher.teacher_id, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) 
            })

        } catch (error) {
            console.log(error.message)
        }
    }
    return <Fragment>
        <button type="button" class="btn btn-info ml-4" data-toggle="modal" data-target={`#teacher_id${teacher.teacher_id}`}>Create Quiz</button>


<div id={`teacher_id${teacher.teacher_id}`} class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">create quiz</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        
      </div>
      <div class="modal-body">
        <p>quiz name:</p>
        <input type="text" className="form-control" onChange={e => setQuiz_name(e.target.value)}/>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal" onClick={e => onCreate(e)}>Create</button>
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

    </Fragment>;
}
 
export default CreateQuiz;