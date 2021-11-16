import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogames } from '../actions';
import Videogame from './Videogame.jsx';


function Videogames() {
    let videogames = useSelector((store)=>store.videogames);
    let dispatch = useDispatch();
    useEffect(() => 
        dispatch(fetchVideogames())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[]);
    return (
        <div>
            {videogames.map((videogame)=>{
            return <Videogame key= {videogame.id} name={videogame.name} img={videogame.background_image}/>
            })}
        </div>
    )
}

export default Videogames


