import './App.css';
import Register from './components/register/Register';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/login/Login';
import Books from './components/books/Books';
import NewBooks from './components/books/NewBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/addnew' element={<NewBooks/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
