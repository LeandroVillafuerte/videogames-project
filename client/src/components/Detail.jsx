import { useEffect , useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import  parse  from 'html-react-parser'
import { Link } from 'react-router-dom';



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
            <Link to="/home"><input type="button" value="Home"/></Link>
            <div>
            {
                videogame?
                <>
                <h4>{videogame && videogame.name}</h4>
                <img src={videogame && videogame.background_image} alt="Videogame img" />
                <div>{videogame && parse(videogame.description)}</div>
                </>:
                <div>loading...</div>
            }
            </div>
        </div>
    )
}

export default Detail
