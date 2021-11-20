import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchGenres } from "../actions";

function Addvideogame() {
  let storedGenres = useSelector((store) => store.genres);
  let dispatch = useDispatch();
  useEffect(

    () => {if(storedGenres && storedGenres.length === 0){dispatch(fetchGenres())}},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  

  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: "",
    platforms: [],
    background_image: "",
    genres: [],
  });

  function handleCheck(e) {
    if (e.target.checked) {
      setVideogame({
        ...videogame,
        genres: [...videogame.genres, Number(e.target.value)],
      });
    } else {
      setVideogame({
        ...videogame,
        genres: videogame.genres.filter((t) => t !== Number(e.target.value)),
      });
    }
  }

  function onInputChange(e) {
    e.preventDefault();
    if (e.target.name === "platforms") {
      setVideogame({
        ...videogame,
        [e.target.name]: [Number(e.target.value),
        ],
      });
    } else if (e.target.name === "genres") {
      if (e.target.checked) {
        setVideogame({
          ...videogame,
          [e.target.name]: [...videogame.genres, parseInt(e.target.value)],
        });
      } else {
        setVideogame({
          ...videogame,
          [e.target.name]: videogame.genres.filter(
            (elem) => elem !== parseInt(e.target.value)
          ),
        });
      }
    } else if (e.target.name === "rating") {
      setVideogame({
        ...videogame,
        [e.target.name]: Number(e.target.value),
      });
    }
    else {
      setVideogame({
        ...videogame,
        [e.target.name]: e.target.value,
      });
    }
  }

  let history = useHistory();
  
  
  function onSubmit(e) {
   // console.log(videogame);
    e.preventDefault();
    axios
      .post("http://localhost:3001/videogame", videogame)
      .then(() => history.push("/home"))
      .catch((e) => console.log(e));
  }
  return (
    <>
    <Link to='/home'><button>return home</button></Link>
    <form onSubmit={onSubmit}>
      <label htmlFor="">Name:</label>
      <input
        type="text"
        name="name"
        onChange={onInputChange}
        value={videogame.name}
      ></input>

      <label htmlFor="">Description:</label>
      <input
        type="text"
        name="description"
        onChange={onInputChange}
        value={videogame.description}
      ></input>

      <label htmlFor="">Release date:</label>
      <input
        type="date"
        name="release_date"
        onChange={onInputChange}
        value={videogame.release_date}
      ></input>

      <label htmlFor="">Rating:</label>
      <input
        type="text"
        name="rating"
        onChange={onInputChange}
        value={videogame.rating}
      ></input>

      <label htmlFor="">Platforms:</label>
      <input
        type="text"
        name="platforms"
        onChange={onInputChange}
        value={videogame.platforms}
      ></input>

      <label htmlFor="">Image:</label>
      <input
        type="text"
        name="background_image"
        onChange={onInputChange}
        value={videogame.background_image}
      ></input>

      <label htmlFor="">Genres:</label>
      <div>
        {storedGenres && storedGenres.length > 0?storedGenres.map((el, i) => {
          return(
          <div key={i}>
            <label>
              <input
                type="checkbox"
                name={el.name}
                id={`chbx${i}`}
                value={el.id}
                onChange={handleCheck}
              />{" "}
              {el.name}
            </label>
            <br />
          </div>
        )}):<span>Loading...</span>}
      </div>

      <input type="submit" value="Save"></input>
    </form>
    </>
  );
}

export default Addvideogame;
