import {
  FETCH_GENRES,
  FETCH_VIDEOGAMES,
  FILTERBYGENRE,
  SEARCH_VIDEOGAMES,
  SORT,
  VIDEOGAMEORIGIN,
} from "../constants/actionstypes";
import {
  CREATEDBYUSER,
  FROMLIBRARY,
  SEEALL,
} from "../constants/createdbyusercons";
import { ASCENDENTE } from "../constants/sortconst";

const initialState = {
  videogames: [],
  sortedvideogames: [],
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        sortedvideogames: action.payload,
      };
    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        sortedvideogames: action.payload,
      };
    case SORT:
      let orderedvideogames = [...state.sortedvideogames];
      orderedvideogames.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === ASCENDENTE ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === ASCENDENTE ? 1 : -1;
        }
        // a debe ser igual b
        return 0;
      });
      return {
        ...state,
        sortedvideogames: orderedvideogames,
      };
    case FILTERBYGENRE:
      let filteredVideogames = [...state.videogames];
      if (action.payload.length !== 0) {
        filteredVideogames = filteredVideogames.filter((elem) =>
          action.payload.every((el) =>
            elem.genres.map((act) => act.id).includes(el)
          )
        );

        return {
          ...state,
          sortedvideogames: filteredVideogames,
        };
      } else {
        return {
          ...state,
          sortedvideogames: state.videogames,
        };
      }
    case VIDEOGAMEORIGIN:
      let byorigin = [...state.videogames];

      switch (action.payload) {
        case SEEALL:
          return {
            ...state,
            sortedvideogames: byorigin,
          };
        case CREATEDBYUSER:
          byorigin = byorigin.filter(
            (videogame) =>
              videogame.id[videogame.id.toString().length - 1] === "u"
          );
          return {
            ...state,
            sortedvideogames: byorigin,
          };
        case FROMLIBRARY:
          byorigin = byorigin.filter(
            (videogame) =>
              videogame.id[videogame.id.toString().length - 1] !== "u"
          );
          return {
            ...state,
            sortedvideogames: byorigin,
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

export default rootReducer;
