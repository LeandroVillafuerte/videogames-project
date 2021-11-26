import axios from "axios";
import  { FETCH_GENRES, FETCH_VIDEOGAMES, FILTERBYGENRE, SEARCH_VIDEOGAMES, SORT, SORTDDATE, SORTRATING, VIDEOGAMEORIGIN } from "../constants/actionstypes.js"
  


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

// export const fetchPlatforms = (payload) => {
//   return function (dispatch) {
//     axios
//       .get("http://localhost:3001/platforms")
//       .then((platforms) => {
//         dispatch({ type: FETCH_PLATFORMS, payload:platforms.data });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
// };

export const sort = (order) => (
  {
  type: SORT,
  payload: order
  }
)

export const filterByGenre = (payload) => (
  {
    type: FILTERBYGENRE,
    payload: payload
  }
)

export const videogameOrigin = (payload) => (
  {
  type: VIDEOGAMEORIGIN,
  payload: payload
  }
)

export const sortRating = (payload) => (
  {
  type: SORTRATING,
  payload: payload
  }
)

export const sortdate = (payload) => (
  {
  type: SORTDDATE,
  payload: payload
  }
)