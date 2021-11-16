import { FETCH_VIDEOGAMES } from "../actions/index.js";

const initialState = {
    videogames : []

}

const rootReducer = (state=initialState,action) =>{
    switch (action.type) {
        case FETCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload
            }
            
    
        default:
            return state;
    }
}

export default rootReducer;
