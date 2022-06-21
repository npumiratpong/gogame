import React, { useEffect, useState, SyntheticEvent}  from 'react'
import {Link, Navigate} from "react-router-dom";

const Home = (props: {email:string}) => {
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setRedirect(true)        
    }
    if (redirect) {
        return <Navigate to="/guess"/>;
    }
    let logged;
    if (props.email == '') {
        logged = (
            <div>
                <h1>Guessing Game!</h1>
                <p className="lead text-muted"> Please login </p>
            </div>
        )
        // console.log('Its Email is empty')
    }
    // } else {
    //     logged = (
    //         <div>
    //             <h1>Guessing Game!</h1>
    //             <button id="playgame" className="w-100 btn btn-lg btn-primary" type="submit">Let's Play Game</button> 
    //         </div>
    //     )
    // }

    return (

        <form onSubmit={submit}>            
        <main className="px-3">
            <div>
                <h1>Guessing Game!</h1>
                <p className="lead text-muted"> Please login </p>
            </div>
        </main>
      </form>
    )
};

export default Home;