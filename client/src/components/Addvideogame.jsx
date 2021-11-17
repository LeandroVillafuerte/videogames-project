import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

function Addvideogame() {
  const [genre,setGenre] = useState([])

  const [videogame, setVideogame] = useState({
    name:"",
    description:"",
    release_date:"",
    rating:[],
    platforms:[],
    background_image:"",
    genres:[]
  });
  let history = useHistory();

  function addGenreHandler(e) {
    let newGenre = genre
    setVideogame({
      ...videogame,
      genres:[...videogame.genres,newGenre]
    })
    setGenre([])
  }
  
  function onInputChange(e) {
    e.preventDefault();
    if (e.target.name === "rating" || e.target.name === "platforms"  ){
      setVideogame({
        ...videogame,
        [e.target.name]: [e.target.name === "platforms"?e.target.value: Number(e.target.value)],
      });
    } else if(e.target.name === "genres"){
      setGenre(Number(e.target.value))
    }
    else{
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value,
    });
    }
  }
  function onSubmit(e) {
    console.log(videogame);
    e.preventDefault();
    axios
      .post("http://localhost:3001/videogame", videogame)
      .then(() => history.push("/"))
      .catch((e) => console.log(e));
  }
  return (
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
      <input
        type="text"
        name="genres"
        onChange={onInputChange}
        value={genre}
      ></input>
      <input type="button" value="Add genre" onClick={addGenreHandler}/>
      {
      videogame.genres?.map((el, i) => (
        <div key={`genre-${i}`}>
          <label htmlFor={`genre-${i}`}>{`genre #${i + 1}`}</label>
          <input
              type="text"
              name={`genre-${i}`}
              id={i}
              data-name="nombre"
              value={el}
          />
        </div>
      ))
      }

      <input type="submit" value="Save"></input>
    </form>
  );
}

export default Addvideogame;
