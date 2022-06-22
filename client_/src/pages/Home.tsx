import React, { useEffect, useState, SyntheticEvent}  from 'react'
import {Link, Navigate} from "react-router-dom";

const Home = (props: {isAuth:boolean}) => {
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setRedirect(true)        
    }
    if (redirect) {
        return <Navigate to="/guess"/>;
    }

    let logged;
    if (props.isAuth == false) {
        logged = (
            <div>
                <h1>Please Login!</h1>
            </div>
        )
    } else {
        logged = (
            <div>
                <header>
                    <h1>Guessing Game!</h1>
                </header>
                <div className='center-button'>
                    <button id="playgame" className="button-home" type="submit">Let's Play Game</button> 
                </div>
            </div>
        )
    }
    
    return (
        
        <form onSubmit={submit}>            
        <main className="px-3">
            <div>
                {logged}
            </div>
        </main>
      </form>
    )
};


export default Home;