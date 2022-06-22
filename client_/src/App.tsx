import './App.css';
import Login from './pages/Login';
import Logout from './pages/Logout' ;
import Home from './pages/Home';
import Guess from './pages/guess';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState }  from 'react'


function App() {

  const [email, setEmail] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
      (
          async ()=> {
              const response = await fetch('http://localhost:8000/api/user', {
              method: 'GET',
              headers: {'Content-Type':'application/json'},
              credentials: 'include',
          })

          const content = await response.json()

          // setIsAuth(content.authorized)
          if (content.authorized ===undefined){
            setIsAuth(false)
          } else {
            setIsAuth(true)
          }
      })()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isAuth={isAuth} setIsAuth={setIsAuth}/>
          <main className="form-signin w-100 m-auto">
            <Routes>
              <Route path="/" element ={<Home isAuth={isAuth}/>}/>
              <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
              <Route path="/guess" element={<Guess isAuth={isAuth}/>} />
              <Route path="/logout" element={<Logout/>} />
            </Routes>
          </main>
        </BrowserRouter>
    </div>    
  );
}

export default App;
