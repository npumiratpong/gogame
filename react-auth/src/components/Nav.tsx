import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props: {name: string, setName: (name:string)=> void}) => {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',

        });

        props.setName('')
    }

    let menu;
    
    
    if (props.name === undefined || props.name === ''){
        console.log('This is props dot name ' + props.name)
        
        menu= (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to={"/login"} className="nav-link" >Login</Link>
                </li>
            </ul>
        )
    } else {

        console.log('Its in ELSE ' + props.name)
        menu = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to={"/login"} className="nav-link" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">Home</Link>

          <div>
            {menu}
          </div>
        </div>
      </nav>
    )
}

export default Nav