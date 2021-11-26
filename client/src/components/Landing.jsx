import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Landing.css'
import henry from "../images/henryicon.ico"

function Landing() {
    return (
        <div>
        <div className='landing'>
        <div className="infoPI">
        <h1>Videogames PI</h1>
        <h3>Leandro Villafuerte</h3>
        </div>
            <div className="henrylives">

            <img src={henry} alt="Icon"/><span> x 3</span>
            </div>
            
            <Link to="/home">
                <button className="start">Press Start</button>
            </Link>
        </div>
        </div>
    )
}

export default Landing
