import './App.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Guess from './pages/Guess';
import Error from './pages/Error';
import  Nav  from './components/Nav';
import { BrowserRouter, Route} from 'react-router-dom';
import React, { useEffect, useState } from 'react'

function App() {

  const [name, setName] = useState('')


  useEffect( ()=> {
      (
         async () => {
          const response = await fetch('http://localhost:8000/api/user', {
              method: 'GET',
              headers: {'Content-Type':'application/json'},
              credentials: 'include',
          });

          const content = await response.json()

          setName(content.issuer)
          console.log( ' This is APP '+ name)

        }
      )()
  })


  return (
    <div className="App"> 
      <BrowserRouter>  
        <Nav name={name} setName={setName}/>

          <main className='form-signin'>
              <Route path="/" exact component={()=> <Home name={name}/>}/>
              <Route path="/login" component={()=> <Login setName={setName}/>}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/guess" component={Guess}/>
          </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
