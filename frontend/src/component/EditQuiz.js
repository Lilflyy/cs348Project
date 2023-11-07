import { Fragment, useState } from "react";

const EditQuiz = ({quiz}) => {
    const[quiz_name, setQuiz_name] = useState(quiz.quiz_name)
    const onEdit = async (e) => {
        e.preventDefault()
        try {
            const body = {quiz_name}
            const response = await fetch("http://localhost:4000/quiz/" + quiz.quiz_id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) 

            })

        } catch (error) {
            console.log(error.message)
        }
    }
    return <Fragment>
<button type="button" class="btn btn-info" data-toggle="modal" data-target={`#quiz_id${quiz.quiz_id}`}>edit</button>


<div id={`quiz_id${quiz.quiz_id}`} class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">edit quiz</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        
      </div>
      <div class="modal-body">
        <input type="text" className="form-control" value={quiz_name} onChange={e => setQuiz_name(e.target.value)}/>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal" onClick={e => onEdit(e)}>edit</button>
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

    </Fragment>;
}
 
export default EditQuiz;