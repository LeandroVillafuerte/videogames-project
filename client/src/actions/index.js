import axios from "axios";
export const FETCH_VIDEOGAMES = "FETCH VIDEOGAMES";

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
