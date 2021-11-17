import axios from "axios";
import  { FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT } from "../constants/actionstypes.js"
  

export const fetchVideogames = (payload) => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/videogames")
      .then((videogames) => {
        dispatch({ type: FETCH_VIDEOGAMES, payload: videogames.data });
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

export const sort = (order) => (
  {
  type: SORT,
  payload: order
  }
)
