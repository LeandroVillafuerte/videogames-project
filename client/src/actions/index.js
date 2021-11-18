import axios from "axios";
import  { FETCH_GENRES, FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT } from "../constants/actionstypes.js"
  

export const fetchVideogames = (payload) => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/videogames")
      .then((videogames) => {
        return{ type: FETCH_VIDEOGAMES, payload: videogames.data };
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const searchVideogames = (search) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogames?name=${search}`)
      .then((videogames) => {
        dispatch({ type: SEARCH_VIDEOGAMES, payload: videogames.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const fetchGenres = (payload) => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/genres")
      .then((genres) => {
        dispatch({ type: FETCH_GENRES, payload:genres.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const sort = (order) => (
  {
  type: SORT,
  payload: order
  }
)
