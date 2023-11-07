import React, {Fragment, useState} from "react";
const AddTeachers = () => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const onSubmit = async e => {
        e.preventDefault()
        try{
            const body = {first_name, last_name, email}
            const response = await fetch("http://localhost:4000/teacher", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) 

            })
            console.log(response)
            setFirst_name('')
            setLast_name('')
            setEmail('')
        } catch (err) {
            console.log(err.message)
        }
    }
    return ( 
        <Fragment>
            <h1 className="text-center"> add teacher</h1>
            <form className="mt-5" onSubmit={onSubmit}>
                <h>first name</h>
                <input type="text" className="form-control" value={first_name} onChange={e => setFirst_name(e.target.value)}></input>
                
                <h>last name</h>
                <input type="text" className="form-control" value={last_name} onChange={e => setLast_name(e.target.value)}></input>
                <h>email</h>
                <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)}></input>
                <button className="btn btn-success">add</button>
            </form>
        </Fragment>
        
     );
}
 
export default AddTeachers;