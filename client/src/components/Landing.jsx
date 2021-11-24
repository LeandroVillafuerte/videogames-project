import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Landing.css'

function Landing() {
    return (
        <div className='landing'>
            <Link to="/home">
                <button className="start">Press Start</button>
            </Link>
        </div>
    )
}

export default Landing
