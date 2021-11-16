import React from 'react'

function Videogame({name,img}) {
    return (
        <div>
            <h4>{name}</h4>
            <img style= {{width: "200px"}} src={img} alt="Videogame img" />
        </div>
    )
}

export default Videogame
