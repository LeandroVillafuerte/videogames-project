import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideogames } from "../actions";
import Videogame from "./Videogame.jsx";
import { Link } from "react-router-dom";
import Pagination from "./Pagination.jsx";

function Videogames() {
  let dispatch = useDispatch();

  let videogames = useSelector((store) => store.sortedvideogames);
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
      <Link to="/videogame/add">
        <button>Add videogame</button>
      </Link>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalVideogames={videogames.length}
        itemsPerPage={15}
      />
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((videogame) => {
          return (
            <Videogame
              key={videogame.id}
              genres={videogame.genres}
              id={videogame.id}
              name={videogame.name}
              img={videogame.background_image}
            />
          );
        })
      ) : (
        <span>Loading...</span>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalVideogames={videogames.length}
        itemsPerPage={15}
      />
    </div>
  );
}

export default Videogames;
