import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Landing.css'

function Landing() {
    return (
        <div>
        <div className='landing'>
        <div className="infoPI">
        <h1>Videogames PI</h1>
        <h3>Leandro Villafuerte</h3>
        </div>
            <Link to="/home">
                <button className="start">Press Start</button>
            </Link>
        </div>
        </div>
    )
}

export default Landing
