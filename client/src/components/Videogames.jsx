import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogames } from '../actions';
import Videogame from './Videogame.jsx';
import { Link } from 'react-router-dom';


function Videogames() {
    let videogames = useSelector((store)=>store.sortedvideogames);
    let dispatch = useDispatch();
    useEffect(() => 
        dispatch(fetchVideogames())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[]);
    return (
        <div>
            <Link to='/videogame/add'><button>Add videogame</button></Link>
            {videogames.map((videogame)=>{
            return <Videogame key= {videogame.id} id={videogame.id} name={videogame.name} img={videogame.background_image}/>
            })}
        </div>
    )
}

export default Videogames


