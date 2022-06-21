import './App.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Guess from './pages/guess';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState }  from 'react'


function App() {

  const [email, setEmail] = useState('')

  useEffect(() => {
      (
          async ()=> {
              const response = await fetch('http://localhost:8000/api/user', {
              headers: {'Content-Type':'application/json'},
              credentials: 'include',
          })

          const content = await response.json()

          setEmail(content.issuer)
          console.log(email)
      })()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Nav email={email} setEmail={setEmail}/>
          <main className="form-signin w-100 m-auto">
            <Routes>
              <Route path="/" element ={<Home email={email}/>}/>
              <Route path="/login" element={<Login setEmail={setEmail}/>} />
              <Route path="/guess" element={<Guess setEmail={setEmail}/>} />
              <Route path="/logout" element={<Logout/>} />
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
