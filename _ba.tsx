import './App.css';
import Login from './client_/src/pages/Login';
import Logout from './client_/src/pages/Logout';
import Home from './client_/src/pages/Home';
import Guess from './client_/src/pages/guess';
import Nav from './client_/src/components/Nav';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import React, { useEffect, useState }  from 'react'
import ProtectedRoute from './client_/src/ProtectedRoute';


const App = () => {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
      (
          async ()=> {
              const response = await fetch('http://localhost:8000/api/user', {
              headers: {'Content-Type':'application/json'},
              credentials: 'include',
          })
          
          const content = await response.json()
          
          setIsAuth(content.authorized)
        })()
      })
      
      return (
        <div className="App">
      <BrowserRouter>
        <Nav/>
          <main className="form-signin w-100 m-auto">
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element ={<Home/>}/>
              <Route path="/guess" element={<Guess/>} />
              <Route path="/logout" element={<Logout/>}/>
            </Routes>
          </main>
        </BrowserRouter>
    </div>

    // <div className="App">
    //   <BrowserRouter>
    //       <main className="form-signin w-100 m-auto">
    //         <Routes>
    //           <Route path="/" element={<Login />} />
    //           <Route element ={<ProtectedRoute/>}>
    //             <Route path="/" element ={<Home email={email}/>}/>
    //             <Route path="/guess" element={<Guess setEmail={setEmail}/>} />
    //             <Route path="/logout" element={<Logout/>} />
    //           </Route>
    //         </Routes>
    //       </main>
    //     </BrowserRouter>
    // </div>
    
  );
}

export default App;


{/* <ProtectedRoute isAuth= {isAuth} path="/guess" element={<Guess/>}/>
<Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/> */}