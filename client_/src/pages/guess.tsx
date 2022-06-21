import React, { useState, SyntheticEvent}  from 'react'

const Guess = (props: {isAuth:boolean}) => {

    const [number, setGuess] = useState('')
    const [message, setMessage] = useState('You got 5 chances')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const reponse = await fetch('http://localhost:8000/api/guess', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                number
            })
        }).then(reponse => reponse.clone().json())
        setMessage(reponse.message)
    }
    
    let game;
    console.log('This is props in Guess ' + props.isAuth)
    if (props.isAuth === true){
        game = (
            <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Let's Take A Guess!</h1>
                        <p className="lead text-muted"> {message} </p>
                        <div className="form-floating">
                            <input type="Number" className="form-control" id="floatingNumber" placeholder="Guess"
                                    required onChange={e => setGuess(e.target.value)}/>
                            <label htmlFor="floatingNumber">Guess Number Between 1 - 10</label>
                         </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Guess</button>
            </form>
        )
    } else {
        game = (
        <h1>Not Authorized!</h1>            
        )
    }

    return (
        <div>
            {game}            
        </div>
    )
};


export default Guess;