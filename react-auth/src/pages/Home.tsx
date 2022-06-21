import React, { useEffect, useState } from 'react'

const Home = (props: {name: string}) => {

    console.log('props.name in HOME '+props.name)

    return (
        <main className="px-3">
            <div>
                {props.name ? 'Lets Guess !': 'You are not authorized'} 
            </div>
        </main>
    )
}

export default Home