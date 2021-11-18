import { FETCH_GENRES, FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT } from "../constants/actionstypes"
import { ASCENDENTE } from "../constants/sortconst"


const initialState = {
    videogames : [],
    sortedvideogames:[],
    genres:[]
}

const rootReducer = (state=initialState,action) =>{
    switch (action.type) {
        case FETCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                sortedvideogames:action.payload
            }
        case FETCH_GENRES:
            return {
                ...state,
                genres:action.payload
            }
        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                sortedvideogames: action.payload
            }    
        case SORT:
            let orderedvideogames = [...state.videogames];
                orderedvideogames.sort((a, b) =>{
                if (a.name < b.name) {
                  return action.payload === ASCENDENTE?-1:1;
                }
                if (a.name>b.name) {
                  return action.payload === ASCENDENTE?1:-1;
                }
                // a debe ser igual b
                return 0;
              })
            return {
                ...state,
                sortedvideogames:orderedvideogames
            }
    
        default:
            return state;
    }
}

export default rootReducer;
