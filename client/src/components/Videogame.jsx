import React from 'react'
import { Link } from 'react-router-dom'

function Videogame({name,img,id}) {
    return (
        <div>
            <Link to={`/videogame/${id}`}>
            <h4>{name}</h4>
            <img style= {{width: "200px"}} src={img} alt="Videogame img" />
            </Link>
        </div>
    )
}

export default Videogame
