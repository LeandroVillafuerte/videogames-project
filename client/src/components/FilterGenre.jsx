import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, filterByGenre } from "../actions";
import "./styles/FilterGenre.css";

function FilterGenre() {
  const [genres, setGenres] = useState([]);

  let storedGenres = useSelector((store) => store.genres);
  let originSelected = useSelector((store) => store.originSelected);
  let dispatch = useDispatch();

  useEffect(
    () => {
      if (storedGenres && storedGenres.length === 0) {
        dispatch(fetchGenres(genres));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      dispatch(filterByGenre(genres));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [originSelected]
  );

  function handleCheck(e) {
    if (e.target.checked) {
      setGenres([...genres, Number(e.target.value)]);
    } else {
      setGenres(genres.filter((t) => t !== Number(e.target.value)));
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(filterByGenre(genres));
  }

  return (
    <div className="selectfilters">
      <h4>Filter By Genre</h4>
      <form className="genres" onSubmit={onSubmit}>
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
        <br />
        <input className="homebtn" type="submit" value="Apply filter"></input>
        <br />
        <br />
      </form>
    </div>
  );
}

export default FilterGenre;
