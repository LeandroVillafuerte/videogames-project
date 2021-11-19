import React from 'react'
import { Link } from 'react-router-dom'

function Videogame(props) {
    return (
        <div>
            <Link to={`/videogame/${props.id}`}>
            <h4>{props.name}</h4>
            <img style= {{width: "200px"}} src={props.img} alt="Videogame img" />
            <div>
                {props.genres?.map((genre,i)=>{
                    return(
                        <div key={`${props.id}+${1+i}`}>
                        <span>{genre.name} </span>
                        </div>
                    )
                })}
            </div>
            </Link>
        </div>
    )
}

export default Videogame
