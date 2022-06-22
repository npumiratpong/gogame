import React, { useState, SyntheticEvent}  from 'react'

const Guess = (props: {isAuth:boolean}) => {

    const [number, setGuess] = useState('')
    const [message, setMessage] = useState(' You have 5 chances to win!')

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
    if (props.isAuth === true){
        game = (
            <form onSubmit={submit}>                    
                        <div className='center'>
                            <h1 className="h3 mb-3 fw-normal">Let's Take A Guess!</h1>
                        </div>
                        <div className='center'>
                            <p className="lead text-muted"> {message} </p>
                        </div>
                        <div className="form-floating">
                            <input type="Number" className="form-control" id="floatingNumber" placeholder="Guess"
                                    required onChange={e => setGuess(e.target.value)}/>
                            <label htmlFor="floatingNumber">Guess Number Between 0 - 10</label>
                         </div>
                    <div className='center-button'>
                        <button className="button" type="submit">Guess</button>                        
                    </div>
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