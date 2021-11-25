import { useEffect , useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import "./styles/Detail.css"
import Loader from "./Loader.jsx"


function Detail() {
    const [videogame, setVideogame] = useState(null)
    let {id} = useParams()
    useEffect(() => {
        axios.get('http://localhost:3001/videogame/'+id)
        .then(response => setVideogame(response.data))

        return () => setVideogame(null)
    }, [id])

    return (
        <div>
            <Link to="/home"><input type="button" value="Home" className="homebtn"/></Link>
            <div id="detailtitle">
                <h1>Videogame detail</h1>
            </div>
            <div className="Card">
            {
                videogame?
                <>
                <img src={videogame && videogame.background_image} alt="Videogame img" />
                {/* <img src={videogame && videogame.background_image_additional} alt="Videogame img"/> */}
                <h2>{videogame && videogame.name}</h2>
                <div className="description">
                <p>
                {videogame && videogame.description}
                </p>
                </div>
                <div>
                <h3>Rating</h3>
                <p>{videogame&&videogame.rating}</p>
                </div>
                <div>
                <h3>Platforms</h3>
                <p>{videogame&&videogame.platforms?.map((el,i)=>{
                    return(
                        <span>{el}  </span>
                    )
                })}</p>
                <h3>Website</h3>
                <p>{videogame&&videogame.website}</p>

                </div>
                
                </>:
                <div style={{width: "100vh",display:"flex",justifyContent:"center"}} ><Loader /></div>
            }
            </div>
        </div>
    )
}

export default Detail
