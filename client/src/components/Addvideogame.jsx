import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchGenres, fetchPlatforms } from "../actions";
import Select from "react-select";


function Addvideogame() {
  let storedGenres = useSelector((store) => store.genres);
  let storedPlatforms = useSelector((store) => store.platforms);
  let dispatch = useDispatch();
  useEffect(() => {
    if (storedGenres && storedGenres.length === 0) {
      dispatch(fetchGenres());
    }
    if (storedPlatforms && storedPlatforms.length === 0) {
      dispatch(fetchPlatforms());
    }
  }, [dispatch, storedGenres, storedPlatforms]);

  const [activeError,setActiveError] = useState({name:false,description:false,platforms:false,rating:false})
  const [errors, setErrors] = useState({
    name: "Name is required",
    description: "Description required",
    platforms: "Select at least one platform",
  });

  function Validate(input){
    let errors = {};
    if(!input.name) errors.name = "Name is required";
    
    if (!input.description)errors.description = "Description required";
    
    if (input.platforms?.length === 0) errors.platforms = "Select at least one platform";
    
    if(input.rating && (input.rating<1 || input.rating>5)) errors.rating = "Rating must be in range 1-5"
    
    if(input.rating) setActiveError({...activeError,rating:false})
    if(input.name) setActiveError({...activeError,name:false})
    if(input.description) setActiveError({...activeError,description:false})
    if(input.platforms?.length !== 0) setActiveError({...activeError,platforms:false})
    
    return errors
      
  }

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
    if (e.target.name === "rating") {
      setVideogame({ ...videogame, [e.target.name]: Number(e.target.value) });
    } else {
      setVideogame({
        ...videogame,
        [e.target.name]: e.target.value,
      });
      setErrors(
        Validate({
          ...videogame,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  function platformsHandler(e) {
    setVideogame({ ...videogame, platforms: e.map((el) => el.id) });
    setErrors(Validate({ ...videogame, platforms: e.map((el) => el.id) }));
  }


  function handleErrorClick(e){
    setActiveError({name:!!errors.name,platforms:!!errors.platforms,description:!!errors.description,rating:!!errors.rating})
  }

  let history = useHistory();
  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/videogame", videogame)
      .then(() => history.push("/home"))
      .catch((e) => console.log(e));
  }
  return (
    <>
      <Link to="/home">
        <button>return home</button>
      </Link>
      <form onSubmit={onSubmit}>
        <div>
        <label htmlFor="">Name*:</label>
        <input
          placeholder="Awesome name"
          type="text"
          name="name"
          onChange={onInputChange}
          value={videogame.name}
        ></input>
        {activeError.name&&(
          <label>{errors.name}</label>
        )}
        </div>

        <div>
        <label htmlFor="">Description*:</label>
        <input
          placeholder="Game description"
          type="text"
          name="description"
          onChange={onInputChange}
          value={videogame.description}
        ></input>
        {activeError.description&&(
          <label>{errors.description}</label>
        )}
        </div>

        <div>
        <label htmlFor="">Release date:</label>
        <input
          type="date"
          name="release_date"
          onChange={onInputChange}
          value={videogame.release_date}
        ></input>
        </div>

        <div>
        <label htmlFor="">Rating:</label>
        <input
          type="number"
          step="0.1"
          min="1"
          max="5"
          name="rating"
          placeholder="1-5"
          onChange={onInputChange}
          value={videogame.rating}
        ></input>
        {activeError.rating&&(
          <label>{errors.rating}</label>
        )}
        </div>

        <div>
        <label htmlFor="">Platforms*:</label>
        <Select
          isMulti
          options={storedPlatforms.map((el, i) => {
            return { value: el.name, label: el.name, id: el.id };
          })}
          onChange={platformsHandler}
          closeMenuOnSelect={false}
        />
        {activeError.platforms&&(
          <label>{errors.platforms}</label>
        )}
        </div>

        <div>
        <label htmlFor="">Image:</label>
        <input
          type="text"
          name="background_image"
          onChange={onInputChange}
          value={videogame.background_image}
          placeholder="Image url"
        ></input>
        </div>

        <div>
        <label htmlFor="">Genres:</label>
        <div>
          {storedGenres && storedGenres.length > 0 ? (
            storedGenres.map((el, i) => {
              return (
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
              );
            })
          ) : (
            <span>Loading...</span>
          )}
        </div>
        </div>

        <div>
        <input type={!errors.platforms&&!errors.name&&!errors.description?"submit":"button"} onClick={handleErrorClick} value="Save"></input>
        </div>
      </form>
    </>
  );
}

export default Addvideogame;
