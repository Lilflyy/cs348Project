import { Fragment } from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './Home';
import Teacher from './pages/teacher';
import ListTeachers from './component/ListTeachers';
import AddTeachers from './component/AddTeacher';
import NavBar from './component/NavBar';
function App() {
  return (
    <BrowserRouter>
    <Fragment>
      <NavBar/>
      <div className='container'>
      <Routes>
        
        <Route path='/' element={<Teacher/>} />
      
      </Routes>
      </div>
     
    </Fragment>
   </BrowserRouter>
  );
}

export default App;
