import {
  FETCH_GENRES,
  FETCH_VIDEOGAMES,
  FILTERBYGENRE,
  SEARCH_VIDEOGAMES,
  SORT,
  SORTRATING,
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
  originSelected:"",
  byoriginVideogames:[],
  genres: [],
  loaded:false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        sortedvideogames: action.payload,
        loaded:true
      };
    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    // case FETCH_PLATFORMS:
    //   return {
    //     ...state,
    //     platforms: action.payload,
    //   };
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        sortedvideogames: action.payload,
      };
    case SORT:
      let sortvideogames = [...state.sortedvideogames];
      sortvideogames.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === ASCENDENTE ? 1 : -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === ASCENDENTE ? -1 : 1;
        }
        // a debe ser igual b
        return 0;
      });
      return {
        ...state,
        sortedvideogames: sortvideogames,
      };
    case FILTERBYGENRE:
      let filteredVideogames = state.byoriginVideogames.length>0? state.byoriginVideogames : state.videogames;
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
          sortedvideogames: filteredVideogames,
        };
      }
    case VIDEOGAMEORIGIN:
      let byorigin = [...state.videogames];

      switch (action.payload) {
        case SEEALL:
          return {
            ...state,
            sortedvideogames: state.videogames,
            byoriginVideogames:[],
            originSelected: action.payload
          };
        case CREATEDBYUSER:
          byorigin = byorigin.filter(
            (videogame) =>
              videogame.id[videogame.id.toString().length - 1] === "u"
          );
          return {
            ...state,
            sortedvideogames: byorigin,
            byoriginVideogames: byorigin,
            originSelected: action.payload
          };
        case FROMLIBRARY:
          byorigin = byorigin.filter(
            (videogame) =>
              videogame.id[videogame.id.toString().length - 1] !== "u"
          );
          return {
            ...state,
            sortedvideogames: byorigin,
            byoriginVideogames: byorigin,
            originSelected: action.payload
          };
        default:
          return state;
      }
    case SORTRATING:
      let orderedrating = [...state.sortedvideogames];
      orderedrating.sort((a, b) => {
        if (a.rating < b.rating) {
          return action.payload === ASCENDENTE ? -1 : 1;
        }
        if (a.rating > b.rating) {
          return action.payload === ASCENDENTE ? 1 : -1;
        }
        // a debe ser igual b
        return 0;
      });
      return {
        ...state,
        sortedvideogames: orderedrating,
      };

    default:
      return state;
  }
};

export default rootReducer;
