import React from 'react'
import { Link } from 'react-router-dom'
import "./styles/Videogame.css"

function Videogame(props) {
    return (
        <div className="videogame card">
            <Link to={`/videogame/${props.id}`}>
            <img src={props.img} alt="Videogame img" />
            <h4 className="videogameTitle">{props.name}</h4>
            <div className="info">
                <div className="videogameGenres">
                    <h4>Genres:</h4>
                    {props.genres?.map((genre,i)=>{
                        return(
                            <div key={`${props.id}+${1+i}`}>
                            <span>{genre.name} </span>
                            </div>
                        )
                    })}
                </div>
                <div>
                <h4>Release date</h4>
                <h3>{props.release_date}</h3>                
                </div>
                <div>
                <h4>Rating</h4>
                <h3>{props.rating}</h3>                
                </div>

            </div>
            </Link>
        </div>
    )
}

export default Videogame
