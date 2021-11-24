import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideogames } from "../actions";
import Videogame from "./Videogame.jsx";
import { Link } from "react-router-dom";
import Pagination from "./Pagination.jsx";
import Loader from "./Loader";
import Searchbar from "./Searchbar";
import SortRating from "./SortRating";
import CreatedByUser from "./CreatedByUser";
import Sortvideogames from "./Sortvideogames";
import FilterGenre from "./FilterGenre";
import "./styles/Home.css";

function Videogames() {
  let dispatch = useDispatch();

  let videogames = useSelector((store) => store.sortedvideogames);
  let loaded = useSelector((store) => store.loaded);
  useEffect(() => {
    dispatch(fetchVideogames());
  }, [dispatch]);

  /*************** pagination  *****************************/
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // const [itemsPerPage,setItemsPerPage]=useState(15);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videogames?.slice(indexOfFirstItem, indexOfLastItem);
  /***************************************************** */

  return (
    <div>
      <div className="header">
        <span id="title">👾 Videogames App 🎮</span>
        <div className="actions">
        <Link to="/videogame/add">
          <button className="nav" id="add">Add new videogame</button>
        </Link>
        <Searchbar />
        </div>
      </div>
      <div className="contenedor">
      <div className="paginado">
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalVideogames={videogames.length}
        itemsPerPage={15}
        />
      </div>
        <div className="filters">
          <FilterGenre />
          <SortRating />
          <CreatedByUser />
          <Sortvideogames />
        </div>

        
          
          {loaded ?<div className="cards"> {
            currentItems.map((videogame) => {
              return (
                <Videogame
                  key={videogame.id}
                  genres={videogame.genres}
                  id={videogame.id}
                  name={videogame.name}
                  img={videogame.background_image}
                  rating={videogame.rating}
                />
              );
            })
          } </div> : (
            <div className="mario"><Loader/></div>
          )}
        
        
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalVideogames={videogames.length}
        itemsPerPage={15}
        />
      </div>
    </div>
  );
}

export default Videogames;
