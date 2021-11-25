import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchGenres} from "../actions";
import "./styles/Addvideogame.css"


function Addvideogame() {
  let storedGenres = useSelector((store) => store.genres);
  // let storedPlatforms = useSelector((store) => store.platforms);
  let dispatch = useDispatch();
  useEffect(() => {
    if (storedGenres && storedGenres.length === 0) {
      dispatch(fetchGenres());
    }
 /*    if (storedPlatforms && storedPlatforms.length === 0) {
      dispatch(fetchPlatforms());
    } */
  }, [dispatch, storedGenres]);

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

  function handleSelectionP(e){
    setVideogame({
        ...videogame,
        [e.target.name] : [...videogame.platforms, e.target.value]
    })
    setErrors(Validate({
        ...videogame,
        platforms: e.target.value
    }))
  } 

  function handleSelectionD(e){
    setVideogame({
        ...videogame,
        [e.target.name] : e.target.value
    })
    setErrors(Validate({
        ...videogame,
        description: e.target.value
    }))
  } 
  // function platformsHandler(e) {
  //   setVideogame({ ...videogame, platforms: e.map((el) => el.id) });
  //   setErrors(Validate({ ...videogame, platforms: e.map((el) => el.id) }));
  // }


  function handleErrorClick(e){
    setActiveError({name:!!errors.name,platforms:!!errors.platforms,description:!!errors.description,rating:!!errors.rating})
  }

  function handleDeletePlat(el){
    setVideogame({
        ...videogame,
        platforms: videogame.platforms.filter( occ => occ !== el)
    })
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
    <div>
      <Link to="/home">
        <button className="butn">Return Home</button>
      </Link>
      <div>
        <h1 id="create">Create a videogame</h1>
      </div>
      <div className="principal">
      <form onSubmit={onSubmit}>
        <div className="detname">
        <label htmlFor="">Name*:</label>
        <br/><br/>
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
        <br/>
        <div className="detdescription">
        <label htmlFor="">Description*:</label>
        <br/><br/>
        <textarea
          placeholder="Game description"
          rows="5"
          cols="50"
          type="textarea"
          name="description"
          onChange={handleSelectionD}
          value={videogame.description}
          style={{resize : "none"}}
          required
        />
        {activeError.description&&(
          <label>{errors.description}</label>
        )}
        </div>
        <br/>
        <div className="detreleasedate">
        <label htmlFor="">Release date:</label>
        <br/><br/>
        <input
          type="date"
          name="release_date"
          onChange={onInputChange}
          value={videogame.release_date}
        ></input>
        </div>
        <br/>
        <div className="detrating">
        <label htmlFor="">Rating:</label>
        <br/>
        <br/>
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
        <br/>
        <div className="detplatforms">
       
        <label className="selectores">Platforms:
        <br/><br/>
                        
                        <select className="selectors" multiple name="platforms" onChange={(e) => handleSelectionP(e)} required>
                            <option value="Wii">WII</option>
                            <option value="PS5">PS5</option>
                            <option value="PS4">PS4</option>
                            <option value="PS3">PS3</option>
                            <option value="Xbox S/X">Xbox S/X</option>
                            <option value="Xbox One">Xbox One</option>
                            <option value="Xbox 360">Xbox 360</option>
                            <option value="Nintendo">Nintendo</option>
                            <option value="PC">PC</option>
                        </select>

                    </label>





        {activeError.platforms&&(
          <label>{errors.platforms}</label>
        )}
    
        </div>
        <br/>
        <div className="detimage">
        
        <label htmlFor="">Image:</label>
        <br/>    <br/>
        <input
          type="text"
          name="background_image"
          onChange={onInputChange}
          value={videogame.background_image}
          placeholder="Image url"
        ></input>
        </div>
        <br/>    <br/>
        <div className="detgenres">
        <label htmlFor="">Genres:</label>
        <br/>    <br/>
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
        <br/>    <br/>

        <div className="detsubmit"> 
        <input type={!errors.platforms&&!errors.name&&!errors.description?"submit":"button"} onClick={handleErrorClick} value="Submit videogame" className="butn"></input>
        </div>
        
        <br/>
        <div className="detplatformsselected">
                <h4>platforms selected:</h4>
                </div>
                <div className='selectedThings'>
                    {
                    videogame.platforms.map((el,i) =>
                        <div>
                            <p key={i}>{el} <button onClick={(e)=> handleDeletePlat(el)} >X</button></p>
                            
                        </div>
                    )
                    }
          </div>

      </form>
    </div>
    </div>
  );
}

export default Addvideogame;




















/*         <Select
          isMulti
          options={storedPlatforms.map((el, i) => {
            return { value: el.name, label: el.name, id: el.id };
          })}
          onChange={platformsHandler}
          closeMenuOnSelect={false}
        /> */
