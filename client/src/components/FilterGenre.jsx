import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGenres, filterByGenre } from '../actions';

function FilterGenre() {

  const [genres, setGenres] = useState([]) 

  let storedGenres = useSelector((store) => store.genres)
  let dispatch = useDispatch();

  useEffect(()=>{if(storedGenres && storedGenres.length === 0){dispatch(fetchGenres(genres))}}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[])

  function handleCheck(e) {
    if (e.target.checked) {
      setGenres([
        ...genres,
        Number(e.target.value)
      ]);
    } else {
      setGenres(
        genres.filter((t) => t !== Number(e.target.value)),
      );
    }
    
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(filterByGenre(genres))
  }

    return (
        <div>
        <h4>Filter By Genre</h4>
        <form onSubmit={onSubmit}>
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
        <input type="submit" value="Apply filter"></input>
        </form>
      </div>
    )
}

export default FilterGenre
